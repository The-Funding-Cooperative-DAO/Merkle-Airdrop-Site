// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// ============ Imports ============

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

/// @title MerkleClaimERC20
/// @notice ERC20 claimable by members of a merkle tree
/// @author Michael Maher
contract MerkleClaimERC20 is Ownable{

  /// ============ Immutable storage ============

  /// @notice ERC20-claimee inclusion root
  bytes32 public merkleRoot;
  address public sender;
  IERC20  public token;
  /// ============ Mutable storage ============

  /// @notice Mapping of addresses who have claimed tokens
  mapping(address => bool) public hasClaimed;
  
  /// ============ Errors ============

  /// @notice Thrown if address has already claimed
  error AlreadyClaimed();
  /// @notice Thrown if address/amount are not part of Merkle tree
  error NotInMerkle();

  /// ============ Constructor ============
  /// sets instance of token, address sending airdrop, and merkle root
  constructor(
    address _tokenAddr,
    address _sender,
    bytes32 _merkleRoot
  )   {
    token = IERC20(_tokenAddr);
    sender = _sender;
    merkleRoot = _merkleRoot;
  }

  /// ============ Events ============

  /// @notice Emitted after a successful token claim
  /// @param to recipient of claim
  /// @param amount of tokens claimed
  event Claim(address indexed to, uint256 amount);

  /// ============ Functions ============

  function updateRoot(bytes32 _merkleRoot) public onlyOwner {
    merkleRoot = _merkleRoot; // Update root
  }

  function updateSender(address _sender) public onlyOwner {
    sender = _sender;
  }

  function updateInstance(address _tokenAddr) public onlyOwner {
    token = IERC20(_tokenAddr);
  }

  /// Allows claiming tokens if address is part of merkle tree
  /// @param to address of claimee
  /// @param amount of tokens owed to claimee
  /// @param proof merkle proof to prove address and amount are in tree
  function claim(address to, uint256 amount, bytes32[] calldata proof) public {
    // Throw if address has already claimed tokens
    if (hasClaimed[to]) revert AlreadyClaimed();

    // Verify merkle proof, or revert if not in tree
    bytes32 leaf = keccak256(abi.encodePacked(to, amount));
    bool isValidLeaf = MerkleProof.verify(proof, merkleRoot, leaf);
    if (!isValidLeaf) revert NotInMerkle();

    // Set address to claimed
    hasClaimed[to] = true;

    // Transfer tokens to address
    require(token.transferFrom(sender, to, amount), "fail send");


    // Emit claim event
    emit Claim(to, amount);
  }
}
