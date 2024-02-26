// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Greeter.sol";

contract GreeterFactory {
    Greeter[] public deployedGreetings;

    function deployGreeter(string memory _greeting) public {
        Greeter newGreeter = new Greeter(_greeting);
        deployedGreetings.push(newGreeter);
    }

    function getDeployedGreetings() public view returns (Greeter[] memory) {
        return deployedGreetings;
    }
}
