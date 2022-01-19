pragma solidity ^0.5;

import "./ERC721Full.sol";

contract Color is ERC721Full {
    mapping (string => bool) _colorExists;
    string [] public colors;
    
    constructor() ERC721Full("Color", "COLOR") public {
    }

    function mint(string memory _color) public {
        require(_colorExists[_color] == false, 'Color already exists!');
        uint _id = colors.push(_color);
        _mint(msg.sender, _id);
        _colorExists[_color] = true;
    }
}