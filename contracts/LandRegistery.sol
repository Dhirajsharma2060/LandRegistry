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

    // Event to emit when a land is registered
    event LandRegistered(uint256 indexed landId, string location, uint256 area, address indexed owner);

    function registerLand(string memory _location, uint256 _area) public {
        landCount++;
        lands[landCount] = Land(landCount, _location, _area, msg.sender, true);
        emit LandRegistered(landCount, _location, _area, msg.sender);
    }

    function getLand(uint256 _landId) public view returns (uint256, string memory, uint256, address, bool) {
        Land memory land = lands[_landId];
        return (land.id, land.location, land.area, land.owner, land.isRegistered);
    }
}
