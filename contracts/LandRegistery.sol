// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 id;
        string location;
        uint256 area; // in square meters
        address owner;
        bool isRegistered;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    // Events
    event LandRegistered(uint256 indexed landId, string location, uint256 area, address indexed owner);
    event LandOwnershipTransferred(uint256 indexed landId, address indexed previousOwner, address indexed newOwner);

    /// @notice Registers a new land parcel
    /// @param _location The location of the land
    /// @param _area The area of the land in square meters
    function registerLand(string memory _location, uint256 _area) public {
        landCount++;
        lands[landCount] = Land(landCount, _location, _area, msg.sender, true);
        emit LandRegistered(landCount, _location, _area, msg.sender);
    }

    /// @notice Fetches land details by ID
    /// @param _landId The ID of the land
    function getLand(uint256 _landId) public view returns (uint256, string memory, uint256, address, bool) {
        require(lands[_landId].isRegistered, "Land not registered");
        Land memory land = lands[_landId];
        return (land.id, land.location, land.area, land.owner, land.isRegistered);
    }

    /// @notice Transfers land ownership to a new owner
    /// @param _landId The ID of the land to transfer
    /// @param _newOwner The address of the new owner
    function transferOwnership(uint256 _landId, address _newOwner) public {
        require(lands[_landId].isRegistered, "Land not registered");
        require(msg.sender == lands[_landId].owner, "Only the current owner can transfer ownership");
        require(_newOwner != address(0), "New owner cannot be zero address");

        address previousOwner = lands[_landId].owner;
        lands[_landId].owner = _newOwner;

        emit LandOwnershipTransferred(_landId, previousOwner, _newOwner);
    }
}
