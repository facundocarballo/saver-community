// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0);
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

library Math {
    enum Rounding {
        Down, // Toward negative infinity
        Up, // Toward infinity
        Zero // Toward zero
    }

    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow.
        return (a & b) + (a ^ b) / 2;
    }

    /**
     * @dev Returns the ceiling of the division of two numbers.
     *
     * This differs from standard division with `/` in that it rounds up instead
     * of rounding down.
     */
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b can overflow on addition, so we distribute.
        return a == 0 ? 0 : (a - 1) / b + 1;
    }

    /**
     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0
     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
     * with further edits by Uniswap Labs also under MIT license.
     */
    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 denominator
    ) internal pure returns (uint256 result) {
        unchecked {
            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use
            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256
            // variables such that product = prod1 * 2^256 + prod0.
            uint256 prod0; // Least significant 256 bits of the product
            uint256 prod1; // Most significant 256 bits of the product
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }

            // Handle non-overflow cases, 256 by 256 division.
            if (prod1 == 0) {
                return prod0 / denominator;
            }

            // Make sure the result is less than 2^256. Also prevents denominator == 0.
            require(denominator > prod1);

            ///////////////////////////////////////////////
            // 512 by 256 division.
            ///////////////////////////////////////////////

            // Make division exact by subtracting the remainder from [prod1 prod0].
            uint256 remainder;
            assembly {
                // Compute remainder using mulmod.
                remainder := mulmod(x, y, denominator)

                // Subtract 256 bit number from 512 bit number.
                prod1 := sub(prod1, gt(remainder, prod0))
                prod0 := sub(prod0, remainder)
            }

            // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.
            // See https://cs.stackexchange.com/q/138556/92363.

            // Does not overflow because the denominator cannot be zero at this stage in the function.
            uint256 twos = denominator & (~denominator + 1);
            assembly {
                // Divide denominator by twos.
                denominator := div(denominator, twos)

                // Divide [prod1 prod0] by twos.
                prod0 := div(prod0, twos)

                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.
                twos := add(div(sub(0, twos), twos), 1)
            }

            // Shift in bits from prod1 into prod0.
            prod0 |= prod1 * twos;

            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such
            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for
            // four bits. That is, denominator * inv = 1 mod 2^4.
            uint256 inverse = (3 * denominator) ^ 2;

            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel's lifting lemma, this also works
            // in modular arithmetic, doubling the correct bits in each step.
            inverse *= 2 - denominator * inverse; // inverse mod 2^8
            inverse *= 2 - denominator * inverse; // inverse mod 2^16
            inverse *= 2 - denominator * inverse; // inverse mod 2^32
            inverse *= 2 - denominator * inverse; // inverse mod 2^64
            inverse *= 2 - denominator * inverse; // inverse mod 2^128
            inverse *= 2 - denominator * inverse; // inverse mod 2^256

            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.
            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is
            // less than 2^256, this is the final result. We don't need to compute the high bits of the result and prod1
            // is no longer required.
            result = prod0 * inverse;
            return result;
        }
    }

    /**
     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.
     */
    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 denominator,
        Rounding rounding
    ) internal pure returns (uint256) {
        uint256 result = mulDiv(x, y, denominator);
        if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
            result += 1;
        }
        return result;
    }

    /**
     * @dev Returns the square root of a number. If the number is not a perfect square, the value is rounded down.
     *
     * Inspired by Henry S. Warren, Jr.'s "Hacker's Delight" (Chapter 11).
     */
    function sqrt(uint256 a) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.
        //
        // We know that the "msb" (most significant bit) of our target number `a` is a power of 2 such that we have
        // `msb(a) <= a < 2*msb(a)`. This value can be written `msb(a)=2**k` with `k=log2(a)`.
        //
        // This can be rewritten `2**log2(a) <= a < 2**(log2(a) + 1)`
        // → `sqrt(2**k) <= sqrt(a) < sqrt(2**(k+1))`
        // → `2**(k/2) <= sqrt(a) < 2**((k+1)/2) <= 2**(k/2 + 1)`
        //
        // Consequently, `2**(log2(a) / 2)` is a good first approximation of `sqrt(a)` with at least 1 correct bit.
        uint256 result = 1 << (log2(a) >> 1);

        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,
        // since it is the square root of a uint256. Newton's method converges quadratically (precision doubles at
        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision
        // into the expected uint128 result.
        unchecked {
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            return min(result, a / result);
        }
    }

    /**
     * @notice Calculates sqrt(a), following the selected rounding direction.
     */
    function sqrt(
        uint256 a,
        Rounding rounding
    ) internal pure returns (uint256) {
        unchecked {
            uint256 result = sqrt(a);
            return
                result +
                (rounding == Rounding.Up && result * result < a ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 2, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 128;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 64;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 32;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 16;
            }
            if (value >> 8 > 0) {
                value >>= 8;
                result += 8;
            }
            if (value >> 4 > 0) {
                value >>= 4;
                result += 4;
            }
            if (value >> 2 > 0) {
                value >>= 2;
                result += 2;
            }
            if (value >> 1 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 2, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(
        uint256 value,
        Rounding rounding
    ) internal pure returns (uint256) {
        unchecked {
            uint256 result = log2(value);
            return
                result +
                (rounding == Rounding.Up && 1 << result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 10, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >= 10 ** 64) {
                value /= 10 ** 64;
                result += 64;
            }
            if (value >= 10 ** 32) {
                value /= 10 ** 32;
                result += 32;
            }
            if (value >= 10 ** 16) {
                value /= 10 ** 16;
                result += 16;
            }
            if (value >= 10 ** 8) {
                value /= 10 ** 8;
                result += 8;
            }
            if (value >= 10 ** 4) {
                value /= 10 ** 4;
                result += 4;
            }
            if (value >= 10 ** 2) {
                value /= 10 ** 2;
                result += 2;
            }
            if (value >= 10 ** 1) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(
        uint256 value,
        Rounding rounding
    ) internal pure returns (uint256) {
        unchecked {
            uint256 result = log10(value);
            return
                result +
                (rounding == Rounding.Up && 10 ** result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 256, rounded down, of a positive value.
     * Returns 0 if given 0.
     *
     * Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string.
     */
    function log256(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 16;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 8;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 4;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 2;
            }
            if (value >> 8 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log256(
        uint256 value,
        Rounding rounding
    ) internal pure returns (uint256) {
        unchecked {
            uint256 result = log256(value);
            return
                result +
                (rounding == Rounding.Up && 1 << (result * 8) < value ? 1 : 0);
        }
    }
}

library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount);

        (bool success, ) = recipient.call{value: amount}("");
        require(success);
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                0,
                "Address: low-level call failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                value,
                "Address: low-level call with value failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(
            address(this).balance >= value,
            "Address: insufficient balance for call"
        );
        (bool success, bytes memory returndata) = target.call{value: value}(
            data
        );
        return
            verifyCallResultFromTarget(
                target,
                success,
                returndata,
                errorMessage
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data
    ) internal view returns (bytes memory) {
        return
            functionStaticCall(
                target,
                data,
                "Address: low-level static call failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return
            verifyCallResultFromTarget(
                target,
                success,
                returndata,
                errorMessage
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return
            functionDelegateCall(
                target,
                data,
                "Address: low-level delegate call failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return
            verifyCallResultFromTarget(
                target,
                success,
                returndata,
                errorMessage
            );
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling
     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.
     *
     * _Available since v4.8._
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        if (success) {
            if (returndata.length == 0) {
                // only check isContract if the call was successful and the return data is empty
                // otherwise we already know that it was a contract
                require(isContract(target), "Address: call to non-contract");
            }
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason or using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function _revert(
        bytes memory returndata,
        string memory errorMessage
    ) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            /// @solidity memory-safe-assembly
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert(errorMessage);
        }
    }
}

library Strings {
    bytes16 private constant _SYMBOLS = "0123456789abcdef";
    uint8 private constant _ADDRESS_LENGTH = 20;

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        unchecked {
            uint256 length = Math.log10(value) + 1;
            string memory buffer = new string(length);
            uint256 ptr;
            /// @solidity memory-safe-assembly
            assembly {
                ptr := add(buffer, add(32, length))
            }
            while (true) {
                ptr--;
                /// @solidity memory-safe-assembly
                assembly {
                    mstore8(ptr, byte(mod(value, 10), _SYMBOLS))
                }
                value /= 10;
                if (value == 0) break;
            }
            return buffer;
        }
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        unchecked {
            return toHexString(value, Math.log256(value) + 1);
        }
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(
        uint256 value,
        uint256 length
    ) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }

    /**
     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
     */
    function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
    }
}

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(address from, address to, uint256 tokenId) external;

    function approve(address to, uint256 tokenId) external;

    function setApprovalForAll(address operator, bool _approved) external;

    function getApproved(
        uint256 tokenId
    ) external view returns (address operator);

    function isApprovedForAll(
        address owner,
        address operator
    ) external view returns (bool);
}

interface IERC721Metadata is IERC721 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function tokenURI(uint256 tokenId) external view returns (string memory);
}

interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}

contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Sinergy NFT
    mapping(address => uint256[]) public get_my_nfts;
    mapping(address => uint256) public favourite_nft;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function updateFromAble() public {}

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(
        address owner
    ) public view virtual override returns (uint256) {
        require(owner != address(0));
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(
        uint256 tokenId
    ) public view virtual override returns (address) {
        address owner = _ownerOf(tokenId);
        require(owner != address(0));
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner);

        require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()));

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(
        uint256 tokenId
    ) public view virtual override returns (address) {
        _requireMinted(tokenId);

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(
        address operator,
        bool approved
    ) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(
        address owner,
        address operator
    ) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId));

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId));
        _safeTransfer(from, to, tokenId, data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, data));
    }

    /**
     * @dev Returns the owner of the `tokenId`. Does NOT revert if token doesn't exist
     */
    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(
        address spender,
        uint256 tokenId
    ) internal view virtual returns (bool) {
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner ||
            isApprovedForAll(owner, spender) ||
            getApproved(tokenId) == spender);
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        _mint(to, tokenId);
        require(_checkOnERC721Received(address(0), to, tokenId, data));
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0));
        require(!_exists(tokenId));

        _beforeTokenTransfer(address(0), to, tokenId);

        // Check that tokenId was not minted by `_beforeTokenTransfer` hook
        require(!_exists(tokenId));

        unchecked {
            // Will not overflow unless all 2**256 token ids are minted to the same owner.
            // Given that tokens are minted one by one, it is impossible in practice that
            // this ever happens. Might change if we allow batch minting.
            // The ERC fails to describe this case.
            _balances[to] += 1;
        }

        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     * This is an internal function that does not check if the sender is authorized to operate on the token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Update ownership in case tokenId was transferred by `_beforeTokenTransfer` hook
        owner = ERC721.ownerOf(tokenId);

        // Clear approvals
        delete _tokenApprovals[tokenId];

        unchecked {
            // Cannot overflow, as that would require more tokens to be burned/transferred
            // out than the owner initially received through minting and transferring in.
            _balances[owner] -= 1;
        }
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
    }

    function add_nft_before_transfer(uint256 tokenId, address wallet) private {
        get_my_nfts[wallet].push(tokenId);
        if (favourite_nft[wallet] == 0) 
        {
            favourite_nft[wallet] = tokenId;
        }
    }

    function delete_nft_before_transfer(
        uint256 tokenId,
        address wallet
    ) private {
        uint256 i = 0;

        while (get_my_nfts[wallet][i] != tokenId) i++;

        for (i; i < (_balances[wallet] - 1); i++) {
            get_my_nfts[wallet][i] = get_my_nfts[wallet][i + 1];
        }

        get_my_nfts[wallet].pop();

        if (favourite_nft[wallet] == tokenId) 
        {
            favourite_nft[wallet] = get_my_nfts[wallet][0];
        }
            
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from);
        require(to != address(0));

        _beforeTokenTransfer(from, to, tokenId);

        // Check that tokenId was not transferred by `_beforeTokenTransfer` hook
        require(ERC721.ownerOf(tokenId) == from);

        // Clear approvals from the previous owner
        delete _tokenApprovals[tokenId];

        unchecked {
            // `_balances[from]` cannot overflow for the same reason as described in `_burn`:
            // `from`'s balance is the number of token held, which is at least one before the current
            // transfer.
            // `_balances[to]` could overflow in the conditions described in `_mint`. That would require
            // all 2**256 token ids to be minted, which in practice is impossible.

            delete_nft_before_transfer(tokenId, from);
            _balances[from] -= 1;

            add_nft_before_transfer(tokenId, to);
            _balances[to] += 1;
        }
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits an {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits an {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator);
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Reverts if the `tokenId` has not been minted yet.
     */
    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId));
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) private returns (bool) {
        if (to.isContract()) {
            try
                IERC721Receiver(to).onERC721Received(
                    _msgSender(),
                    from,
                    tokenId,
                    data
                )
            returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert();
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any (single) token transfer. This includes minting and burning.
     * See {_beforeConsecutiveTokenTransfer}.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any (single) transfer of tokens. This includes minting and burning.
     * See {_afterConsecutiveTokenTransfer}.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called before consecutive token transfers.
     * Calling conditions are similar to {_beforeTokenTransfer}.
     *
     * The default implementation include balances updates that extensions such as {ERC721Consecutive} cannot perform
     * directly.
     */
    function _beforeConsecutiveTokenTransfer(
        address from,
        address to,
        uint256 /*first*/,
        uint96 size
    ) internal virtual {
        if (from != address(0)) {
            _balances[from] -= size;
        }
        if (to != address(0)) {
            _balances[to] += size;
        }
    }

    /**
     * @dev Hook that is called after consecutive token transfers.
     * Calling conditions are similar to {_afterTokenTransfer}.
     */
    function _afterConsecutiveTokenTransfer(
        address /*from*/,
        address /*to*/,
        uint256 /*first*/,
        uint96 /*size*/
    ) internal virtual {}
}

abstract contract ERC721URIStorage is ERC721 {
    using Strings for uint256;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        require(_exists(tokenId));
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev See {ERC721-_burn}. This override additionally checks to see if a
     * token-specific URI was set for the token, and if so, it deletes the token URI from
     * the storage mapping.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender());
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0));
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract SinergyMigration is ERC721, ERC721URIStorage, Ownable {
    // Constants
    uint256 public constant PRICE = 36 ether;
    uint256 public constant REWARD = 3 ether;
    uint256 public constant TO_DEVELOPMENT = 3 ether;

    // NFT GENESIS
    string constant NFT_GENESIS_NAME = "GENESIS";
    string constant NFT_GENESIS_INSCRIPTION = "GENESIS INSCRIPTION";
    string constant NFT_GENESIS_VALUE_PROPOSAL = "GENESIS VALUE PROPOSAL";
    string constant NFT_GENESIS_IMAGE_URL =
        "https://res.cloudinary.com/saver-community/image/upload/v1666380501/jvjbls4lg5mtxsxhlhnf.png";

    // Migration
    Sinergy ContractMigration =
        Sinergy(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    // ERC20's
    ERC20 CDA = ERC20(0x8e3153a724aF487Fd11fB4C4cDA508984dEDf3c4);
    ERC20 ABLE = ERC20(0xd9B9c7A1B42f1ad78D9C3Dd5C7F0381277ddc9Bb);
    ERC20 BUSD = ERC20(0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de);

    // Able Sale
    SinergySale public ABLE_SALE =
        SinergySale(0xD8c101aA6b225135b437E3B87988457B23Adb2f0);
    SinergySale public TRIPLE_SALE =
        SinergySale(0xD8c101aA6b225135b437E3B87988457B23Adb2f0);

    // Address
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    uint256 public oneDay = 12 minutes;
    uint256 public timeToNextReward;

    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Migration
    mapping(address => bool) public isRecover;
    mapping(uint256 => bool) public nftRecover;
    mapping(uint256 => bool) public first_level_references_recover;
    mapping(uint256 => bool) public second_level_references_recover;
    mapping(uint256 => bool) public third_level_references_recover;
    mapping(uint256 => bool) public four_level_references_recover;
    mapping(uint256 => bool) public five_level_references_recover;
    mapping(uint256 => bool) public six_level_references_recover;
    mapping(uint256 => bool) public seven_level_references_recover;
    mapping(uint256 => bool) public eight_level_references_recover;
    mapping(uint256 => bool) public nine_level_references_recover;
    uint256 public starting_nft_id;
    uint256[] public recovered_nfts;
    uint256 public recovered_nfts_amount;

    // Constructor
    constructor(uint256 initial_tokenID) ERC721("Saver Sinergy", "Sinergy") {
        while (_tokenIds.current() < initial_tokenID) {
            _tokenIds.increment();
        }

        timeToNextReward = block.timestamp + oneDay;
        starting_nft_id = initial_tokenID;
    }

    // NFT's
    uint256 public nfts_qualified;
    mapping(address => bool) public is_qualified;
    // mapping(address => uint256) public favourite_nft;
    // mapping(address => uint256[]) public get_my_nfts;
    mapping(uint256 => string) public get_nft_name;
    mapping(uint256 => string) public get_nft_inscription;
    mapping(uint256 => string) public get_nft_value_proposal;
    mapping(uint256 => uint256) public get_nft_timestamp_created;
    mapping(uint256 => string) public get_nft_image_url;

    // mapping(string => uint256[]) public get_nfts_by_keyword; // me queda implementarlo en el crear nft

    // References
    // Esto sabemos que va (Cantidad de NFTs que estan conectados conmigo en el NIVEL x)
    mapping(uint256 => uint256) public get_first_level_amount_reference;
    mapping(uint256 => uint256) public get_second_level_amount_reference;
    mapping(uint256 => uint256) public get_third_level_amount_reference;
    mapping(uint256 => uint256) public get_four_level_amount_reference;
    mapping(uint256 => uint256) public get_five_level_amount_reference;
    mapping(uint256 => uint256) public get_six_level_amount_reference;
    mapping(uint256 => uint256) public get_seven_level_amount_reference;
    mapping(uint256 => uint256) public get_eight_level_amount_reference;
    mapping(uint256 => uint256) public get_nine_level_amount_reference;

    mapping(uint256 => uint256) public get_total_amount_references; // Cantidad de NFTs que estan conectados conmigo en total.

    // Esto puede fallar (NFT ID de cada uno que esta conectado con nosotros en el NIVEL x)
    mapping(uint256 => uint256[]) public get_first_level_references;
    mapping(uint256 => uint256[]) public get_second_level_references;
    mapping(uint256 => uint256[]) public get_third_level_references;
    mapping(uint256 => uint256[]) public get_four_level_references;
    mapping(uint256 => uint256[]) public get_five_level_references;
    mapping(uint256 => uint256[]) public get_six_level_references;
    mapping(uint256 => uint256[]) public get_seven_level_references;
    mapping(uint256 => uint256[]) public get_eight_level_references;
    mapping(uint256 => uint256[]) public get_nine_level_references;

    // NFT al que me conecte
    mapping(uint256 => uint256) public get_nft_reference;

    // Rewards
    mapping(uint256 => uint256) public get_nft_balance_to_claim;
    mapping(uint256 => uint256) public get_nft_rewards_claimed;
    // Passive Rewards
    uint256 public passiveRewardID;
    mapping(uint256 => uint256) public passiveReward;
    mapping(uint256 => uint256) public passiveRewardClaimed;
    mapping(address => uint256) public timestampToClaimPassiveReward;

    // Constancy Rewards (usa el ID de las pasivas)
    mapping(uint256 => uint256) public constancyReward;
    mapping(uint256 => uint256) public constancyRewardClaimed;
    mapping(address => uint256) public timestampToClaimConstancyReward;

    // Resources
    uint256 public resourcesAmount;

    // Stadistics
    mapping(address => uint256) public total_stablecoin_earned;
    mapping(address => uint256) public total_lost_income;
    mapping(address => uint256) public actual_lost_income;

    // Auxs
    mapping(address => uint256) public amount_nfts_considered;

    // Public Functions
    // Migration
    function migrate() public {
        require(!isRecover[msg.sender]);

        if (msg.sender == communityWallet) {
            create_genesis_nfts();
            isRecover[communityWallet] = true;
            return;
        }

        uint256 amountNFTs = ContractMigration.balanceOf(msg.sender);
        uint256[] storage nfts = get_my_nfts[msg.sender];
        uint256[] storage new_nfts_recovered = recovered_nfts;
        uint256 nftID;

        for (uint256 i = 0; i < amountNFTs; i++) {
            nftID = ContractMigration.get_my_nfts(msg.sender, i);
            nfts.push(nftID);
            new_nfts_recovered.push(nftID);
            recovered_nfts_amount++;
            recoverNFT(nftID);
            _safeMint(msg.sender, nftID);
        }

        favourite_nft[msg.sender] = ContractMigration.favourite_nft(msg.sender);
        get_my_nfts[msg.sender] = nfts;
        recovered_nfts = new_nfts_recovered;
        isRecover[msg.sender] = true;
    }

    function recoverNFT(uint256 nftID) private {
        // NFT Basic Info
        get_nft_name[nftID] = ContractMigration.get_nft_name(nftID);
        get_nft_inscription[nftID] = ContractMigration.get_nft_inscription(
            nftID
        );
        get_nft_value_proposal[nftID] = ContractMigration
            .get_nft_value_proposal(nftID);
        get_nft_timestamp_created[nftID] = ContractMigration
            .get_nft_timestamp_created(nftID);
        get_nft_image_url[nftID] = ContractMigration.get_nft_image_url(nftID);
        get_nft_reference[nftID] = ContractMigration.get_nft_reference(nftID);

        // References
        get_first_level_amount_reference[nftID] = ContractMigration
            .get_first_level_amount_reference(nftID);
        get_second_level_amount_reference[nftID] = ContractMigration
            .get_second_level_amount_reference(nftID);
        get_third_level_amount_reference[nftID] = ContractMigration
            .get_third_level_amount_reference(nftID);
        get_four_level_amount_reference[nftID] = ContractMigration
            .get_four_level_amount_reference(nftID);
        get_five_level_amount_reference[nftID] = ContractMigration
            .get_five_level_amount_reference(nftID);
        get_six_level_amount_reference[nftID] = ContractMigration
            .get_six_level_amount_reference(nftID);
        get_seven_level_amount_reference[nftID] = ContractMigration
            .get_seven_level_amount_reference(nftID);
        get_eight_level_amount_reference[nftID] = ContractMigration
            .get_eight_level_amount_reference(nftID);
        get_nine_level_amount_reference[nftID] = ContractMigration
            .get_nine_level_amount_reference(nftID);

        get_total_amount_references[nftID] = ContractMigration
            .get_total_amount_references(nftID);

        nftRecover[nftID] = true;
    }

    function recoverFirstLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !first_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_first_level_references[nftID];
        // uint256 amount = ContractMigration.get_first_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_first_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_first_level_references(nftID, i));
        }

        get_first_level_references[nftID] = nfts;
        first_level_references_recover[nftID] = true;
    }

    function recoverSecondLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !second_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_second_level_references[nftID];
        // uint256 amount = ContractMigration.get_second_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_second_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_second_level_references(nftID, i));
        }

        get_second_level_references[nftID] = nfts;
        second_level_references_recover[nftID] = true;
    }

    function recoverThirdLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !third_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_third_level_references[nftID];
        // uint256 amount = ContractMigration.get_third_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_third_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_third_level_references(nftID, i));
        }

        get_third_level_references[nftID] = nfts;
        third_level_references_recover[nftID] = true;
    }

    function recoverFourLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !four_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_four_level_references[nftID];
        // uint256 amount = ContractMigration.get_four_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_four_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_four_level_references(nftID, i));
        }

        get_four_level_references[nftID] = nfts;
        four_level_references_recover[nftID] = true;
    }

    function recoverFiveLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !five_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_five_level_references[nftID];
        // uint256 amount = ContractMigration.get_five_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_five_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_five_level_references(nftID, i));
        }

        get_five_level_references[nftID] = nfts;
        five_level_references_recover[nftID] = true;
    }

    function recoverSixLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) && !six_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_six_level_references[nftID];
        // uint256 amount = ContractMigration.get_six_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_six_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_six_level_references(nftID, i));
        }

        get_six_level_references[nftID] = nfts;
        six_level_references_recover[nftID] = true;
    }

    function recoverSevenLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !seven_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_seven_level_references[nftID];
        // uint256 amount = ContractMigration.get_seven_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_seven_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_seven_level_references(nftID, i));
        }

        get_seven_level_references[nftID] = nfts;
        seven_level_references_recover[nftID] = true;
    }

    function recoverEightLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !eight_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_eight_level_references[nftID];
        // uint256 amount = ContractMigration.get_eight_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_eight_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_eight_level_references(nftID, i));
        }

        get_eight_level_references[nftID] = nfts;
        eight_level_references_recover[nftID] = true;
    }

    function recoverNineLevelReferences(uint256 nftID) public {
        require(
            msg.sender == ownerOf(nftID) &&
                !nine_level_references_recover[nftID]
        );

        uint256[] storage nfts = get_nine_level_references[nftID];
        // uint256 amount = ContractMigration.get_nine_level_amount_reference(nftID);

        for (
            uint256 i = 0;
            i < ContractMigration.get_nine_level_amount_reference(nftID);
            i++
        ) {
            nfts.push(ContractMigration.get_nine_level_references(nftID, i));
        }

        get_nine_level_references[nftID] = nfts;
        nine_level_references_recover[nftID] = true;
    }

    // NFT
    function createNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        string memory _uri,
        string memory _imageURL,
        uint256 _ref,
        uint256 _timestamp
    ) public {
        // Get Reference

        uint256 _reference = favourite_nft[ABLE.lastDonationFrom()];

        if (_ref != 0) {
            _reference = _ref;
        }

        if (_reference == 0) {
            _reference = 8;
        }

        require(_reference < _tokenIds.current());

        BUSD.transferFrom(msg.sender, address(this), PRICE);

        update_qualified_nfts(msg.sender);

        ABLE_SALE.try_to_swap(favourite_nft[msg.sender]);

        // Mint NFT
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, tokenID);

        // Set URI
        _setTokenURI(tokenID, _uri);

        // Add information to the NFT
        get_nft_name[tokenID] = _name;
        get_nft_inscription[tokenID] = _inscription;
        get_nft_value_proposal[tokenID] = _valueProposal;
        get_nft_reference[tokenID] = _reference;

        get_nft_image_url[tokenID] = _imageURL;
        get_nft_timestamp_created[tokenID] = _timestamp;

        if (favourite_nft[msg.sender] == 0) {
            favourite_nft[msg.sender] = tokenID;
        }

        uint256[] storage myNFTS = get_my_nfts[msg.sender];
        myNFTS.push(tokenID);
        get_my_nfts[msg.sender] = myNFTS;

        // Increase the resources amount
        resourcesAmount += TO_DEVELOPMENT;

        // Increase Passive Rewards
        passiveReward[passiveRewardID] += 6 ether;

        // Distribute BUSD's in 9 generations
        distribute(tokenID, _reference, true);

        update(msg.sender);

        // Emit event
        // emit Mint(tokenID, block.timestamp, _name, _valueProposal, msg.sender);
    }

    function modifyNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        uint256 _tokenID
    ) public {
        require(msg.sender == ownerOf(_tokenID));
        BUSD.transferFrom(msg.sender, address(this), PRICE);

        // Modify the NFT
        get_nft_name[_tokenID] = _name;
        get_nft_inscription[_tokenID] = _inscription;
        get_nft_value_proposal[_tokenID] = _valueProposal;

        // Increase the resources amount
        resourcesAmount += TO_DEVELOPMENT;

        // Increase Passive Rewards
        passiveReward[passiveRewardID] += 6 ether;

        // Distribute BUSD in 9 generations
        distribute(_tokenID, get_nft_reference[_tokenID], false);

        update(msg.sender);
    }

    // Rewards
    function claimReward(uint256 _tokenID) public {
        require(
            msg.sender == ownerOf(_tokenID) &&
                get_nft_balance_to_claim[_tokenID] > 0
        );

        BUSD.transfer(msg.sender, get_nft_balance_to_claim[_tokenID]);

        // // Emit events
        // emit Reward(
        //     _tokenID,
        //     get_nft_balance_to_claim[_tokenID],
        //     msg.sender,
        //     block.timestamp
        // );

        get_nft_rewards_claimed[_tokenID] += get_nft_balance_to_claim[_tokenID];
        get_nft_balance_to_claim[_tokenID] = 0;

        update(msg.sender);
    }

    function viewAmountToClaimPassiveReward(
        address wallet
    ) public view returns (uint256) {
        if (passiveRewardID == 0 || nfts_qualified == 0) return 0;
        if (nfts_qualified < balanceOf(wallet)) return 0;

        uint256 amount_raised = passiveReward[passiveRewardID - 1];
        uint256 amount_claimed = passiveRewardClaimed[passiveRewardID - 1];
        uint256 amount_to_claim = ((balanceOf(wallet) * amount_raised) /
            nfts_qualified);

        if (amount_to_claim > (amount_raised - amount_claimed)) {
            return (amount_raised - amount_claimed);
        }

        return amount_to_claim;
    }

    function viewAmountToClaimConstancyReward(
        address wallet
    ) public view returns (uint256) {
        // Formula:
        // Veces que gane el Premio Able * Cantidad recaudada / Veces que ganaron el Premio Able
        uint256 totalWinsSaverReward = ABLE.totalWinsSaverReward();
        uint256 winsSaverRewardOf = ABLE.winsSaverRewardOf(wallet);

        if (passiveRewardID == 0 || totalWinsSaverReward == 0) return 0;
        if (totalWinsSaverReward < winsSaverRewardOf) return 0;

        uint256 amount_raised = constancyReward[passiveRewardID - 1];
        uint256 amount_claimed = constancyRewardClaimed[passiveRewardID - 1];
        uint256 amount_to_claim = ((winsSaverRewardOf * amount_raised) /
            totalWinsSaverReward);

        if (amount_to_claim > (amount_raised - amount_claimed)) {
            return (amount_raised - amount_claimed);
        }

        return amount_to_claim;
    }

    function claimPassiveReward() public {
        require(
            passiveRewardID > 0 &&
                block.timestamp > timestampToClaimPassiveReward[msg.sender] &&
                ABLE.canReclaim(msg.sender)
        );

        uint256 amount = viewAmountToClaimPassiveReward(msg.sender);

        BUSD.transfer(msg.sender, amount);

        passiveRewardClaimed[passiveRewardID - 1] += amount;

        timestampToClaimPassiveReward[msg.sender] = block.timestamp + oneDay;

        update(msg.sender);

        // Emit events
        // emit PassiveReward(amount, msg.sender, block.timestamp);
    }

    function claimConstancyReward() public {
        require(
            passiveRewardID > 0 &&
                block.timestamp > timestampToClaimConstancyReward[msg.sender] &&
                ABLE.canReclaim(msg.sender) &&
                ABLE.winSaverReward(msg.sender) &&
                ABLE.totalWinsSaverReward() >= 2
        );

        uint256 amount = viewAmountToClaimConstancyReward(msg.sender);

        BUSD.transfer(msg.sender, amount);

        constancyRewardClaimed[passiveRewardID - 1] += amount;

        timestampToClaimConstancyReward[msg.sender] = block.timestamp + oneDay;

        update(msg.sender);

        // Emit Event
    }

    function claimResources() public {
        require(msg.sender == developmentWallet);

        BUSD.transfer(msg.sender, resourcesAmount);

        // Emit events
        // emit Resources(block.timestamp, resourcesAmount);

        resourcesAmount = 0;

        update(msg.sender);
    }

    // Read functions
    function getAmountOfNftMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Set Functions
    function setAbleAddress(address _ableAddress) public {
        require(msg.sender == developmentWallet);

        ABLE = ERC20(_ableAddress);
    }

    function setFavouriteNFT(uint256 id) public {
        require(_tokenIds.current() > id);
        favourite_nft[msg.sender] = id;
        update(msg.sender);
    }

    function changeCommunityWallet(address newAddress) public {
        require(msg.sender == communityWallet);

        communityWallet = newAddress;
    }

    // Booleans
    function nft_was_qualified(uint256 tokenID) public view returns (bool) {
        return
            ABLE.canReclaim(ownerOf(tokenID)) ||
            ABLE.qualifiedHistory(ownerOf(tokenID), ABLE.cycle() - 1);
    }

    // Update Functions
    function update_qualified_nfts(address wallet) private {
        if (is_qualified[wallet]) {
            nfts_qualified -= amount_nfts_considered[wallet];
            amount_nfts_considered[wallet] = 0;
            is_qualified[wallet] = false;
        }

        if (ABLE.canReclaim(wallet)) {
            nfts_qualified += balanceOf(wallet);
            amount_nfts_considered[wallet] = balanceOf(wallet);
            is_qualified[wallet] = true;
        }
    }

    function update_timestamp() private {
        if (block.timestamp > timeToNextReward) {
            if (
                passiveRewardID > 0 &&
                passiveReward[passiveRewardID - 1] >
                passiveRewardClaimed[passiveRewardID - 1]
            ) {
                passiveReward[passiveRewardID] += (passiveReward[
                    passiveRewardID - 1
                ] - passiveRewardClaimed[passiveRewardID - 1]);
            }

            if (
                passiveRewardID > 0 &&
                constancyReward[passiveRewardID - 1] >
                constancyRewardClaimed[passiveRewardID - 1]
            ) {
                constancyReward[passiveRewardID] += (constancyReward[
                    passiveRewardID - 1
                ] - constancyRewardClaimed[passiveRewardID - 1]);
            }

            passiveRewardID++;
            timeToNextReward = block.timestamp + oneDay;
        }
    }

    function update(address wallet) public {
        ABLE.updateFromSinergy(wallet);

        update_timestamp();

        update_qualified_nfts(wallet);
    }

    function updateFromAble(address wallet) public {
        update_timestamp();
        update_qualified_nfts(wallet);
    }

    function getAbleBalance(address wallet) public view returns (uint256) {
        return ABLE.balanceOf(wallet);
    }

    // SaleToken Public Functions
    function set_able_sale(SinergySale ableSale) public {
        require(msg.sender == developmentWallet);
        ABLE_SALE = ableSale;
    }

    function set_triple_sale(SinergySale tripleSale) public {
        require(msg.sender == developmentWallet);
        TRIPLE_SALE = tripleSale;
    }

    function set_passive_rewards(uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE)
        );
        passiveReward[passiveRewardID] += amount;
    }

    function set_active_rewards(uint256 tokenID, uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE)
        );
        get_nft_balance_to_claim[tokenID] += amount;
    }

    function set_constancy_reward(uint256 amount) public {
        require(
            msg.sender == address(ABLE_SALE) ||
                msg.sender == address(TRIPLE_SALE)
        );
        constancyReward[passiveRewardID] += amount;
    }

    // Private Functions

    // Distribute 9 generations
    function distribute(
        uint256 tokenID,
        uint256 _reference,
        bool created
    ) private {
        address owner;
        uint256 i = 0;
        while (i < 9) {
            if (created) setReferences(i, tokenID, _reference);

            owner = ownerOf(_reference);

            if (ABLE.canReclaim(owner)) {
                get_nft_balance_to_claim[_reference] += REWARD;
                total_stablecoin_earned[owner] += REWARD;
            } else {
                passiveReward[passiveRewardID] += REWARD;
                total_lost_income[owner] += REWARD;
                actual_lost_income[owner] = REWARD;
            }

            _reference = get_nft_reference[_reference];

            i++;
        }
    }

    function create_genesis_nfts() private {
        // Crear 8 NFTs para la billetera destinada a Desarrollo y Mantenimiento
        // Estos NFTs deben estar vinculados entre si
        uint256[] storage myNFTS = get_my_nfts[communityWallet];
        uint256[] storage new_nfts_recovered = recovered_nfts;

        for (uint256 i = 0; i < 9; i++) {
            _safeMint(communityWallet, i);

            recoverNFT(i);

            myNFTS.push(i);
            new_nfts_recovered.push(i);
            recovered_nfts_amount++;

            _setTokenURI(
                i,
                "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/0.json"
            );
        }

        get_my_nfts[communityWallet] = myNFTS;
        recovered_nfts = new_nfts_recovered;
    }

    function setReferences(uint256 i, uint256 tokenID, uint256 ref) private {
        if (i == 0) {
            get_first_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_first_level_references[ref];
            nftIDs.push(tokenID);
            get_first_level_references[ref] = nftIDs;

            return;
        }

        if (i == 1) {
            get_second_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_second_level_references[ref];
            nftIDs.push(tokenID);
            get_second_level_references[ref] = nftIDs;

            return;
        }

        if (i == 2) {
            get_third_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_third_level_references[ref];
            nftIDs.push(tokenID);
            get_third_level_references[ref] = nftIDs;

            return;
        }

        if (i == 3) {
            get_four_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_four_level_references[ref];
            nftIDs.push(tokenID);
            get_four_level_references[ref] = nftIDs;

            return;
        }

        if (i == 4) {
            get_five_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_five_level_references[ref];
            nftIDs.push(tokenID);
            get_five_level_references[ref] = nftIDs;

            return;
        }

        if (i == 5) {
            get_six_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_six_level_references[ref];
            nftIDs.push(tokenID);
            get_six_level_references[ref] = nftIDs;

            return;
        }

        if (i == 6) {
            get_seven_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_seven_level_references[ref];
            nftIDs.push(tokenID);
            get_seven_level_references[ref] = nftIDs;

            return;
        }

        if (i == 7) {
            get_eight_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_eight_level_references[ref];
            nftIDs.push(tokenID);
            get_eight_level_references[ref] = nftIDs;

            return;
        }

        if (i == 8) {
            get_nine_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            uint256[] storage nftIDs = get_nine_level_references[ref];
            nftIDs.push(tokenID);
            get_nine_level_references[ref] = nftIDs;

            return;
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

contract Sinergy is ERC721, ERC721URIStorage, Ownable {
    // Constants
    uint256 public constant PRICE = 36 ether;
    uint256 public constant ABLE_PRICE = 12 ether;
    uint256 public constant REWARD = 3 ether;
    uint256 public constant TO_DEVELOPMENT = 3 ether;

    // NFT GENESIS
    string constant NFT_GENESIS_NAME = "GENESIS";
    string constant NFT_GENESIS_INSCRIPTION = "GENESIS INSCRIPTION";
    string constant NFT_GENESIS_VALUE_PROPOSAL = "GENESIS VALUE PROPOSAL";
    string constant NFT_GENESIS_IMAGE_URL =
        "https://res.cloudinary.com/saver-community/image/upload/v1666380501/jvjbls4lg5mtxsxhlhnf.png";

    // Migration
    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    Migration public MigrationContract =
        Migration(0xfd26B8BE868C0E16A5a54E8D586B0C6D7d6892fA);

    // ERC20's
    ERC20 public ABLE = ERC20(0x68627b19b01C497749328e160e17a168D7719956);
    ERC20 public BUSD = ERC20(0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de);

    // Able Sale
    SinergySale public ABLE_SALE =
        SinergySale(0x7fa46675165F0d0Ab1A3bd3FD96AA3eD59167B52);

    // Passive Rewards
    Reward public BUSD_PassiveReward =
        Reward(0x4F19668690b3501fa2404039436d4f1C14079dB8);
    Reward public ABLE_PassiveReward =
        Reward(0x72e29bC0cF7E6f2A3FC99890069E857b736F6dE9);

    // Constancy Rewards (usa el ID de las pasivas)
    Reward public BUSD_ConstancyReward =
        Reward(0x2B06dD06Cf7cdAB0f8cC39a6F79FD88b20cb2C5D);
    Reward public ABLE_ConstancyReward =
        Reward(0xc32AfBC61e4A2Be096cBe27Fa1072EA7f25Aa79d);

    // Address
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    uint256 public oneDay = 6 minutes;
    uint256 public timeToNextReward;

    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public starting_nft_id;
    uint256 initial_tokenID = 1159;

    // Constructor
    constructor() ERC721("Offer Sinergy", "Sinergy") {
        while (_tokenIds.current() < initial_tokenID) {
            _tokenIds.increment();
        }

        // Mint NFT
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(developmentWallet, tokenID);
        get_nft_name[tokenID] = NFT_GENESIS_NAME;
        get_nft_inscription[tokenID] = NFT_GENESIS_INSCRIPTION;
        get_nft_value_proposal[tokenID] = NFT_GENESIS_VALUE_PROPOSAL;
        get_nft_image_url[tokenID] = NFT_GENESIS_IMAGE_URL;
        get_nft_timestamp_created[tokenID] = block.timestamp;
        favourite_nft[developmentWallet] = tokenID;

        _setTokenURI(
            tokenID,
            "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/273.json"
        );

        get_my_nfts[developmentWallet].push(tokenID);

        timeToNextReward = block.timestamp + oneDay;
        starting_nft_id = initial_tokenID;

        total_holders++;

        is_holder[developmentWallet] = true;
    }

    // NFT's
    uint256 public nfts_qualified;
    mapping(address => bool) public is_qualified;
    mapping(uint256 => string) public get_nft_name;
    mapping(uint256 => string) public get_nft_inscription;
    mapping(uint256 => string) public get_nft_value_proposal;
    mapping(uint256 => uint256) public get_nft_timestamp_created;
    mapping(uint256 => string) public get_nft_image_url;

    // References
    // Esto sabemos que va (Cantidad de NFTs que estan conectados conmigo en el NIVEL x)
    mapping(uint256 => uint256) public get_first_level_amount_reference;
    mapping(uint256 => uint256) public get_second_level_amount_reference;
    mapping(uint256 => uint256) public get_third_level_amount_reference;
    mapping(uint256 => uint256) public get_four_level_amount_reference;
    mapping(uint256 => uint256) public get_five_level_amount_reference;
    mapping(uint256 => uint256) public get_six_level_amount_reference;
    mapping(uint256 => uint256) public get_seven_level_amount_reference;
    mapping(uint256 => uint256) public get_eight_level_amount_reference;
    mapping(uint256 => uint256) public get_nine_level_amount_reference;

    mapping(uint256 => uint256) public get_total_amount_references; // Cantidad de NFTs que estan conectados conmigo en total.

    // Esto puede fallar (NFT ID de cada uno que esta conectado con nosotros en el NIVEL x)
    mapping(uint256 => uint256[]) public get_first_level_references;
    mapping(uint256 => uint256[]) public get_second_level_references;
    mapping(uint256 => uint256[]) public get_third_level_references;
    mapping(uint256 => uint256[]) public get_four_level_references;
    mapping(uint256 => uint256[]) public get_five_level_references;
    mapping(uint256 => uint256[]) public get_six_level_references;
    mapping(uint256 => uint256[]) public get_seven_level_references;
    mapping(uint256 => uint256[]) public get_eight_level_references;
    mapping(uint256 => uint256[]) public get_nine_level_references;

    // NFT al que me conecte
    mapping(uint256 => uint256) public get_nft_reference;

    // Rewards
    mapping(uint256 => uint256) public nft_affiliate_rewards_earned;

    // Resources
    uint256 public total_raided_for_admin;

    // Stadistics
    uint256 public total_stablecoin_distributed;
    mapping(address => uint256) public total_stablecoin_earned;
    mapping(address => uint256) public total_lost_income;
    mapping(address => uint256) public actual_lost_income;
    mapping(uint256 => uint256) public nfts_created_by_cycle;

    // Holders
    mapping(address => bool) public is_holder;
    uint256 public total_holders;

    // Auxs
    mapping(address => uint256) public amount_nfts_considered;

    // Events
    event Mint(
        uint256 id,
        uint256 date,
        string indexed name,
        string indexed valueProposal,
        address indexed wallet
    );

    event AffiliateRewardEvent(
        uint256 tokenID,
        uint256 amount,
        address indexed wallet,
        uint256 indexed date
    );

    event ChangeFavourite(
        address indexed wallet,
        uint256 previousFavourite,
        uint256 actualFavourite
    );

    // Public Functions
    // Migration

    function set_migration_contract(Migration _migrationContract) public {
        if (msg.sender != developmentWallet) return;
        MigrationContract = _migrationContract;
    }

    function handleRecover(address wallet, uint256 tokenId) public {
        if (msg.sender != address(MigrationContract)) return;

        recoverNFT(tokenId);
        get_my_nfts[wallet].push(tokenId);
        _safeMint(wallet, tokenId);

        if (favourite_nft[wallet] == 0) {
            favourite_nft[wallet] = tokenId;
        }
    }

    function recoverNFT(uint256 nftID) private {
        // NFT Basic Info
        get_nft_name[nftID] = ContractMigration.get_nft_name(nftID);
        get_nft_inscription[nftID] = ContractMigration.get_nft_inscription(
            nftID
        );
        get_nft_value_proposal[nftID] = ContractMigration
            .get_nft_value_proposal(nftID);
        get_nft_timestamp_created[nftID] = ContractMigration
            .get_nft_timestamp_created(nftID);
        get_nft_image_url[nftID] = ContractMigration.get_nft_image_url(nftID);
        get_nft_reference[nftID] = ContractMigration.get_nft_reference(nftID);

        // References
        get_first_level_amount_reference[nftID] = ContractMigration
            .get_first_level_amount_reference(nftID);
        get_second_level_amount_reference[nftID] = ContractMigration
            .get_second_level_amount_reference(nftID);
        get_third_level_amount_reference[nftID] = ContractMigration
            .get_third_level_amount_reference(nftID);
        get_four_level_amount_reference[nftID] = ContractMigration
            .get_four_level_amount_reference(nftID);
        get_five_level_amount_reference[nftID] = ContractMigration
            .get_five_level_amount_reference(nftID);
        get_six_level_amount_reference[nftID] = ContractMigration
            .get_six_level_amount_reference(nftID);
        get_seven_level_amount_reference[nftID] = ContractMigration
            .get_seven_level_amount_reference(nftID);
        get_eight_level_amount_reference[nftID] = ContractMigration
            .get_eight_level_amount_reference(nftID);
        get_nine_level_amount_reference[nftID] = ContractMigration
            .get_nine_level_amount_reference(nftID);

        get_total_amount_references[nftID] = ContractMigration
            .get_total_amount_references(nftID);
    }

    function handlerRecoverFirstLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_first_level_references[tokenId].push(
            ContractMigration.get_first_level_references(tokenId, index)
        );
    }

    function handlerRecoverSecondLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_second_level_references[tokenId].push(
            ContractMigration.get_second_level_references(tokenId, index)
        );
    }

    function handlerRecoverThirdLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_third_level_references[tokenId].push(
            ContractMigration.get_third_level_references(tokenId, index)
        );
    }

    function handlerRecoverFourLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_four_level_references[tokenId].push(
            ContractMigration.get_four_level_references(tokenId, index)
        );
    }

    function handlerRecoverFiveLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_five_level_references[tokenId].push(
            ContractMigration.get_five_level_references(tokenId, index)
        );
    }

    function handlerRecoverSixLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_six_level_references[tokenId].push(
            ContractMigration.get_six_level_references(tokenId, index)
        );
    }

    function handlerRecoverSevenLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_seven_level_references[tokenId].push(
            ContractMigration.get_seven_level_references(tokenId, index)
        );
    }

    function handlerRecoverEightLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_eight_level_references[tokenId].push(
            ContractMigration.get_eight_level_references(tokenId, index)
        );
    }

    function handlerRecoverNineLevel(uint256 tokenId, uint256 index) public {
        if (msg.sender != address(MigrationContract)) return;

        get_nine_level_references[tokenId].push(
            ContractMigration.get_nine_level_references(tokenId, index)
        );
    }

    // NFT
    function createNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        string memory _uri,
        string memory _imageURL,
        uint256 _ref,
        uint256 _timestamp
    ) public {
        // Get Reference

        uint256 _reference = favourite_nft[ABLE.lastDonationFrom()];

        if (_ref != 0) {
            _reference = _ref;
        }

        if (_reference == 0) {
            _reference = 8;
        }

        require(_reference < _tokenIds.current());

        BUSD.transferFrom(msg.sender, address(this), PRICE);
        ABLE.transferFrom(msg.sender, address(this), ABLE_PRICE);

        // Transferimos 3 BUSD para el admin
        BUSD.transfer(communityWallet, TO_DEVELOPMENT);

        update_qualified_nfts(msg.sender);

        ABLE_SALE.try_to_swap(favourite_nft[msg.sender]);

        // Mint NFT
        uint256 tokenID = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(msg.sender, tokenID);

        // Set URI
        _setTokenURI(tokenID, _uri);

        // Add information to the NFT
        get_nft_name[tokenID] = _name;
        get_nft_inscription[tokenID] = _inscription;
        get_nft_value_proposal[tokenID] = _valueProposal;
        get_nft_reference[tokenID] = _reference;

        get_nft_image_url[tokenID] = _imageURL;
        get_nft_timestamp_created[tokenID] = _timestamp;

        if (favourite_nft[msg.sender] == 0) {
            favourite_nft[msg.sender] = tokenID;
        }

        // uint256[] storage myNFTS = get_my_nfts[msg.sender];
        get_my_nfts[msg.sender].push(tokenID);
        // get_my_nfts[msg.sender] = myNFTS;

        // Increase the resources amount
        total_raided_for_admin += TO_DEVELOPMENT;

        // Increase Rewards
        ABLE_PassiveReward.set_reward(6 ether);
        ABLE.transfer(address(ABLE_PassiveReward), 6 ether);

        BUSD_PassiveReward.set_reward(3 ether);
        BUSD.transfer(address(BUSD_PassiveReward), 3 ether);

        ABLE_ConstancyReward.set_reward(6 ether);
        ABLE.transfer(address(ABLE_ConstancyReward), 6 ether);

        BUSD_ConstancyReward.set_reward(3 ether);
        BUSD.transfer(address(BUSD_ConstancyReward), 3 ether);

        // Distribute BUSD's in 9 generations
        distribute(tokenID, _reference, true);

        update(msg.sender);

        // Aumentamos la cantidad de NFTs creados en este ciclo
        nfts_created_by_cycle[ABLE.cycle()]++;

        // Holders
        if (!is_holder[msg.sender]) {
            is_holder[msg.sender] = true;
            total_holders++;
        }

        // Emit event
        emit Mint(tokenID, block.timestamp, _name, _valueProposal, msg.sender);
    }

    function modifyNFT(
        string memory _name,
        string memory _inscription,
        string memory _valueProposal,
        uint256 _tokenID
    ) public {
        require(msg.sender == ownerOf(_tokenID));

        BUSD.transferFrom(msg.sender, address(this), PRICE);
        ABLE.transferFrom(msg.sender, address(this), ABLE_PRICE);

        // Transferimos 3 BUSD para el admin
        BUSD.transfer(communityWallet, TO_DEVELOPMENT);

        // Modify the NFT
        get_nft_name[_tokenID] = _name;
        get_nft_inscription[_tokenID] = _inscription;
        get_nft_value_proposal[_tokenID] = _valueProposal;

        // Increase the resources amount
        total_raided_for_admin += TO_DEVELOPMENT;

        // Increase Rewards
        BUSD_PassiveReward.set_reward(3 ether);
        BUSD.transfer(address(BUSD_PassiveReward), 3 ether);

        ABLE_PassiveReward.set_reward(6 ether);
        ABLE.transfer(address(ABLE_PassiveReward), 6 ether);

        ABLE_ConstancyReward.set_reward(6 ether);
        ABLE.transfer(address(ABLE_ConstancyReward), 6 ether);

        BUSD_ConstancyReward.set_reward(3 ether);
        BUSD.transfer(address(ABLE_ConstancyReward), 3 ether);

        // Distribute BUSD in 9 generations
        distribute(_tokenID, get_nft_reference[_tokenID], false);

        update(msg.sender);
    }

    // Read functions
    function getAmountOfNftMinted() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Set Functions
    function setAbleAddress(address _ableAddress) public {
        require(msg.sender == developmentWallet);

        ABLE = ERC20(_ableAddress);
    }

    function setRewards(
        Reward busd_passive,
        Reward busd_constancy,
        Reward able_passive,
        Reward able_constancy
    ) public {
        require(msg.sender == developmentWallet);
        BUSD_PassiveReward = busd_passive;
        BUSD_ConstancyReward = busd_constancy;
        ABLE_PassiveReward = able_passive;
        ABLE_ConstancyReward = able_constancy;
    }

    function setFavouriteNFT(address wallet, uint256 id) public {
        require(id <= _tokenIds.current());
        require(msg.sender == ownerOf(id) || msg.sender == address(MigrationContract), "Wallet not qualified to setFavouriteNFT");

        uint256 previousFavourite = favourite_nft[wallet];
        favourite_nft[wallet] = id;

        emit ChangeFavourite(msg.sender, previousFavourite, id);
    }

    function changeCommunityWallet(address newAddress) public {
        require(msg.sender == communityWallet);

        communityWallet = newAddress;
    }

    // Booleans
    function nft_was_qualified(uint256 tokenID) public view returns (bool) {
        return
            ABLE.canReclaim(ownerOf(tokenID)) ||
            ABLE.qualifiedHistory(ownerOf(tokenID), ABLE.cycle() - 1);
    }

    // Update Functions
    function update_qualified_nfts(address wallet) private {
        if (is_qualified[wallet]) {
            nfts_qualified -= amount_nfts_considered[wallet];
            amount_nfts_considered[wallet] = 0;
            is_qualified[wallet] = false;
        }

        if (ABLE.canReclaim(wallet)) {
            nfts_qualified += balanceOf(wallet);
            amount_nfts_considered[wallet] = balanceOf(wallet);
            is_qualified[wallet] = true;
        }
    }

    function update_timestamp() private {
        if (block.timestamp > timeToNextReward) {
            BUSD_PassiveReward.update();
            ABLE_PassiveReward.update();

            BUSD_ConstancyReward.update();
            ABLE_ConstancyReward.update();

            timeToNextReward = block.timestamp + oneDay;
        }
    }

    function update(address wallet) public {
        ABLE.updateFromSinergy(wallet);

        update_timestamp();

        update_qualified_nfts(wallet);
    }

    function updateFromAble(address wallet) public {
        update_timestamp();
        update_qualified_nfts(wallet);
    }

    function getAbleBalance(address wallet) public view returns (uint256) {
        return ABLE.balanceOf(wallet);
    }

    // SaleToken Public Functions
    function set_able_sale(SinergySale ableSale) public {
        require(msg.sender == developmentWallet);
        ABLE_SALE = ableSale;
    }

    // Private Functions

    // Distribute 9 generations
    function distribute(
        uint256 tokenID,
        uint256 _reference,
        bool created
    ) private {
        address owner;
        uint256 i = 0;
        while (i < 9) {
            if (created) setReferences(i, tokenID, _reference);

            owner = ownerOf(_reference);

            total_stablecoin_earned[owner] += REWARD;
            nft_affiliate_rewards_earned[_reference] += REWARD;
            total_stablecoin_distributed += REWARD;
            BUSD.transfer(owner, REWARD);

            // Emit events
            emit AffiliateRewardEvent(
                _reference,
                REWARD,
                owner,
                block.timestamp
            );

            _reference = get_nft_reference[_reference];

            i++;
        }
    }

    function create_genesis_nfts() public {
        if (msg.sender != address(MigrationContract)) return;

        // Crear 8 NFTs para la billetera destinada a Desarrollo y Mantenimiento
        // Estos NFTs deben estar vinculados entre si
        uint256 affiliate_rewards;

        for (uint256 i = 0; i < 9; i++) {
            _safeMint(communityWallet, i);

            recoverNFT(i);

            affiliate_rewards += ContractMigration.get_nft_balance_to_claim(i);

            get_my_nfts[communityWallet].push(i);

            _setTokenURI(
                i,
                "ipfs://QmRi1DvgDu6zAJwpbURGNBBQTM82ZCNZAyTkEArbKZKm1U/0.json"
            );
        }
    }

    function setReferences(uint256 i, uint256 tokenID, uint256 ref) private {
        if (i == 0) {
            get_first_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_first_level_references[ref];
            get_first_level_references[ref].push(tokenID);
            // get_first_level_references[ref] = nftIDs;

            return;
        }

        if (i == 1) {
            get_second_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_second_level_references[ref];
            get_second_level_references[ref].push(tokenID);
            // get_second_level_references[ref] = nftIDs;

            return;
        }

        if (i == 2) {
            get_third_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_third_level_references[ref];
            get_third_level_references[ref].push(tokenID);
            // get_third_level_references[ref] = nftIDs;

            return;
        }

        if (i == 3) {
            get_four_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_four_level_references[ref];
            get_four_level_references[ref].push(tokenID);
            // get_four_level_references[ref] = nftIDs;

            return;
        }

        if (i == 4) {
            get_five_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_five_level_references[ref];
            get_five_level_references[ref].push(tokenID);
            // get_five_level_references[ref] = nftIDs;

            return;
        }

        if (i == 5) {
            get_six_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_six_level_references[ref];
            get_six_level_references[ref].push(tokenID);
            // get_six_level_references[ref] = nftIDs;

            return;
        }

        if (i == 6) {
            get_seven_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_seven_level_references[ref];
            get_seven_level_references[ref].push(tokenID);
            // get_seven_level_references[ref] = nftIDs;

            return;
        }

        if (i == 7) {
            get_eight_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_eight_level_references[ref];
            get_eight_level_references[ref].push(tokenID);
            // get_eight_level_references[ref] = nftIDs;

            return;
        }

        if (i == 8) {
            get_nine_level_amount_reference[ref]++;
            get_total_amount_references[ref]++;
            // uint256[] storage nftIDs = get_nine_level_references[ref];
            get_nine_level_references[ref].push(tokenID);
            // get_nine_level_references[ref] = nftIDs;

            return;
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

contract ERC20 is Context, IERC20, IERC20Metadata {
    // Migration Saver
    uint256 timestampToCloseMigration;
    mapping(address => bool) public isRecover;

    // ERC20 Standard
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    uint256 public POTENCIAL = 9;

    uint256 public timeStableCoinReward = 6 minutes;

    // Saver
    uint256 public maxSupply = 369000000000 * 10 ** 18;
    uint256 public initialSupply = 369000000 * 10 ** 18;
    uint256 public devSupply = 1845000 * 10 ** 18;

    // Addresses
    address payable public communityWallet =
        payable(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    address public managementWallet =
        0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public managementWallet2 =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;
    address public devWallet = 0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    // Saver Reward
    mapping(address => bool) public isListedToClaimSaver;
    mapping(address => uint256) public cyclesOf;

    // ERC20's
    // Stable Coin
    ERC20 public USDC = ERC20(0x4E8F5dC8c0f21992116Aac2458b0Bded98E11F13); // USDC (6 decimals)
    uint256 public USDC_DECIMALS = 6;

    ERC20 public USDT = ERC20(0x17c3358F9Aa2D85E49d502EFBc27c9289ef913aA); // USDT (6 decimals)
    uint256 public USDT_DECIMALS = 6;

    ERC20 public BUSD = ERC20(0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de); // BUSD (18 decimals)
    uint256 public BUSD_DECIMALS = 18;

    // Contract Migration
    ERC20 public AbleMigration =
        ERC20(0xB13D289830F6512dFf4C6ce97f121F29bD400E39);
    ERC20 public TripleMigration =
        ERC20(0x38e43FCEEE68373e08a30714123010b8d841364d);
    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);

    // ERC721
    ERC721 public SinergyBronze;
    ERC721 public SinergySilver;
    ERC721 public SinergyGold;

    // Sell List
    SinergySale public ABLE_SALE;

    // Cycles
    uint256 public cycle = 1;
    mapping(address => uint256) public cycleToCheck;
    mapping(address => uint256) public cycleToSaverReward;
    uint256 public CYCLES_FOR_SAVER_REWARD = 3;

    // Saver Reward
    mapping(address => uint256) public balanceOfWins_SaverReward;
    mapping(address => bool) public winSaverReward;
    mapping(address => uint256) public winsSaverRewardOf;
    mapping(address => uint256) public total_saver_earned_of;
    uint256 public totalWinsSaverReward;
    uint256 public total_saver_distributed;
    address[] public wallet_winners;

    // Stable Coin Reward
    uint256 public minAmountToQualify = 3 * 10 ** 18;
    uint256 public rewardID = 1;
    uint256 public rewardIDonClaim;
    uint256 public totalStableCoinDistribute;

    mapping(uint256 => uint256) public rewardAmount; // rewardAmount[rewardID] => Amount Raised
    mapping(uint256 => uint256) public rewardAmountClaimed; // rewardAmount[rewardID] => Amount Claimed

    mapping(uint256 => uint256) public timeOpenClaimReward; // timeOpenClaimReward[rewardID] => timestamp

    mapping(address => mapping(uint256 => bool)) public holderClaimed; // holderClaimed[wallet][rewardID] => bool

    mapping(address => uint256) public stableCoinEarned;
    mapping(address => uint256) public stableCoinEarnedByAbleReward;

    mapping(address => bool) public isQualified; // isQualified[wallet] => bool

    mapping(address => uint256) public claimFrom;

    // Donations
    uint256 public totalDonationBalance;
    uint256 public qualifiedDonationBalance;
    uint256 public totalDonations;
    uint256 public wallets_with_donation_balance;
    uint256 public total_qualified_wallets;
    mapping(address => uint256) public donationBalance;
    mapping(address => uint256) public allDonatesOf;
    uint256 public lastDonationTimestamp;
    address public lastDonationFrom;

    // Donations per day
    mapping(address => mapping(uint256 => uint256)) public donatedByDayOf; // donatedByDayOf[wallet][cycle] => amount donated
    mapping(address => mapping(uint256 => uint256))
        public donationBalancePerCycle;

    // Savings
    mapping(address => mapping(uint256 => uint256)) public usdcRecord;
    mapping(address => uint256) public lastAmountUSDC;

    mapping(address => mapping(uint256 => uint256)) public usdtRecord;
    mapping(address => uint256) public lastAmountUSDT;

    // Holders
    uint256 public totalHolders;
    uint256 public qualifiedHolders;
    mapping(address => bool) public isHolder;
    mapping(address => string) public personalPurpose;
    mapping(address => string) public communityPurpose;

    // Resources for Admin
    uint256 public total_raised_for_admin; // Total amount raised for admin

    // Videos
    bool public sort; // true => sorted | false => not sorted
    uint256 public videoID;
    mapping(uint256 => string) public youtubeID;

    mapping(uint256 => string) public firstQuestion;
    mapping(uint256 => string) public secondQuestion;
    mapping(uint256 => string) public thirdQuestion;

    mapping(uint256 => string) public firstRealAnswer;
    mapping(uint256 => string) public secondRealAnswer;
    mapping(uint256 => string) public thirdRealAnswer;

    mapping(uint256 => string) public firstFakeAnswer1;
    mapping(uint256 => string) public secondFakeAnswer1;
    mapping(uint256 => string) public thirdFakeAnswer1;

    mapping(uint256 => string) public firstFakeAnswer2;
    mapping(uint256 => string) public secondFakeAnswer2;
    mapping(uint256 => string) public thirdFakeAnswer2;

    mapping(address => mapping(uint256 => bool)) public videoAnswerOf; // answerOf[wallet][cycle] => true

    // Qualified
    // qualified[wallet][cycle] => bool
    mapping(address => mapping(uint256 => bool)) public qualifiedSinergy;
    mapping(address => mapping(uint256 => bool)) public qualifiedSaver;
    mapping(address => mapping(uint256 => bool)) public qualifiedUSDC;
    mapping(address => mapping(uint256 => bool)) public qualifiedUSDT;
    mapping(address => mapping(uint256 => bool)) public qualifiedBDD;
    mapping(address => mapping(uint256 => bool)) public qualifiedDonatedPerDay;
    mapping(address => mapping(uint256 => bool)) public qualifiedVideo;
    mapping(address => mapping(uint256 => bool)) public qualifiedHistory;

    // Informacion
    string public managementInfo;

    // Events
    event ClaimBUSD(
        uint256 indexed date,
        uint256 amount,
        address indexed wallet
    );

    event ClaimAble(
        uint256 indexed date,
        uint256 amount,
        address indexed wallet
    );

    event AnswerVideo(uint256 indexed date, bool res, address indexed wallet);

    event Update(uint256 indexed date, address indexed wallet);

    // Nuevos eventos
    event AbleRewardQualification(
        uint256 indexed date,
        address indexed wallet,
        bool status
    ); // true => te has enlistado para el premio able || false => te has descalificado del premio able

    event UserQualification(
        uint256 indexed date,
        address indexed wallet,
        bool status
    );

    event CycleChange(uint256 indexed date, uint256 indexed cycle);

    event CloseCycle(
        address indexed wallet,
        uint256 cycle,
        bool qualifiedSinergy,
        bool qualifiedUSDT,
        bool qualifiedUSDC,
        bool qualifiedSaver,
        bool qualifiedBDD,
        bool qualifiedDonatedPerDay,
        bool qualifiedVideo
    );

    event Points(
        address indexed wallet,
        uint256 cycle,
        uint256 amount,
        bool increase
    );

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;

        timeOpenClaimReward[rewardID] = block.timestamp + timeStableCoinReward;

        timestampToCloseMigration = block.timestamp + 30 days;

        // Se mintea el 0.1% del totalSupply (369.000.000 ABLE)
        _mint(communityWallet, initialSupply - devSupply);
        _mint(devWallet, devSupply);

        isHolder[communityWallet] = true;
        isHolder[devWallet] = true;

        totalHolders = 2;
        qualifiedHolders = 2;
        total_qualified_wallets = 2;
    }

    // Recover Saver
    function get_able_to_recover(address wallet) public view returns (uint256) {
        bool was_active = AbleMigration.canReclaim(wallet);
        uint256 _cycle = AbleMigration.cycle();
        uint256 i;
        uint256 default_amount = AbleMigration.balanceOf(wallet) +
            TripleMigration.balanceOf(wallet);

        while (!was_active && i < 69) {
            was_active = AbleMigration.qualifiedHistory(wallet, _cycle - i);
            i++;
        }
        if (was_active) {
            return (default_amount + AbleMigration.donationBalance(wallet));
        }

        return default_amount;
    }

    function migrate() public {
        require(block.timestamp < timestampToCloseMigration);
        require(!isRecover[msg.sender]);

        // Recover Donation Balance
        donationBalance[msg.sender] += AbleMigration.donationBalance(
            msg.sender
        );
        totalDonationBalance += donationBalance[msg.sender];
        allDonatesOf[msg.sender] += AbleMigration.allDonatesOf(msg.sender);


        // Recover Purposes
        personalPurpose[msg.sender] = AbleMigration.personalPurpose(msg.sender);
        communityPurpose[msg.sender] = AbleMigration.communityPurpose(
            msg.sender
        );

        // Recover SAVF (Last Saver Fast)
        _mint(msg.sender, get_able_to_recover(msg.sender));

        if (AbleMigration.balanceOf(msg.sender) > 0 && !isHolder[msg.sender]) {
            totalHolders++;
            isHolder[msg.sender] = true;
        }

        // Recover Qualified Donation Balance
        if (canReclaim(msg.sender) && !isQualified[msg.sender]) {
            qualifiedDonationBalance += donationBalance[msg.sender];
            isQualified[msg.sender] = true;
            qualifiedHolders++;
            emit UserQualification(block.timestamp, msg.sender, true);
        }

        isRecover[msg.sender] = true;
    }

    function burn_bdd(uint256 amount) public {
        require(donationBalance[msg.sender] >= amount);

        reduceDonationBalance(msg.sender, amount);
    }

    function claim() public {
        uint256 amountRaised = rewardAmount[rewardIDonClaim];
        uint256 amountClaimed = rewardAmountClaimed[rewardIDonClaim];

        require(!holderClaimed[msg.sender][rewardIDonClaim]);

        require(rewardIDonClaim >= claimFrom[msg.sender]);
        require(canReclaim(msg.sender));

        uint256 stableCoinToClaim = viewClaimStableCoin(msg.sender);

        require(stableCoinToClaim > 0);

        require(amountRaised >= (amountClaimed + stableCoinToClaim));

        require(donationBalance[msg.sender] >= (stableCoinToClaim / POTENCIAL));

        require(BUSD.transfer(msg.sender, stableCoinToClaim));

        reduceDonationBalance(msg.sender, stableCoinToClaim / POTENCIAL);

        rewardAmountClaimed[rewardIDonClaim] += stableCoinToClaim;
        holderClaimed[msg.sender][rewardIDonClaim] = true;
        totalStableCoinDistribute += stableCoinToClaim;
        stableCoinEarned[msg.sender] += stableCoinToClaim;
        stableCoinEarnedByAbleReward[msg.sender] += stableCoinToClaim;

        _updateALL(msg.sender);

        // Emit events
        emit ClaimBUSD(block.timestamp, stableCoinToClaim, msg.sender);
    }

    function claimSaver() public {
        _updateALL(msg.sender);
        require((_totalSupply + donationBalance[msg.sender]) < maxSupply);
        require(
            canReclaimSaver(msg.sender),
            "You are not qualified to claim SAVER."
        );

        // Nueva version
        require(
            cycleToSaverReward[msg.sender] < cycle,
            "You have to wait 30 days to claim your SAVER."
        );

        // Emit events
        emit ClaimAble(
            block.timestamp,
            donationBalance[msg.sender],
            msg.sender
        );

        _mint(msg.sender, donationBalance[msg.sender]);

        isListedToClaimSaver[msg.sender] = false;

        if (!winSaverReward[msg.sender]) {
            address[] storage winners = wallet_winners;
            winners.push(msg.sender);
            wallet_winners = winners;
        }

        winSaverReward[msg.sender] = true;

        winsSaverRewardOf[msg.sender]++;
        totalWinsSaverReward++;

        balanceOfWins_SaverReward[msg.sender]++;

        total_saver_distributed += donationBalance[msg.sender];
        total_saver_earned_of[msg.sender] += donationBalance[msg.sender];

        stableCoinEarnedByAbleReward[msg.sender] = 0;

        updateTimestampRewards();
    }

    // Video

    function uploadVideoAndFirstQuestion(
        string memory _youtubeID,
        string memory _firstQuestion,
        string memory _firstRealAnswer,
        string memory _firstFakeAnswer1,
        string memory _firstFakeAnswer2
    ) public {
        require(
            msg.sender == managementWallet ||
                msg.sender == managementWallet2 ||
                msg.sender == communityWallet,
            "You are not qualified to call this function"
        );
        youtubeID[videoID] = _youtubeID;

        firstQuestion[videoID] = _firstQuestion;

        firstRealAnswer[videoID] = _firstRealAnswer;

        firstFakeAnswer1[videoID] = _firstFakeAnswer1;

        firstFakeAnswer2[videoID] = _firstFakeAnswer2;

        videoID++;
    }

    function uploadSecondQuestion(
        string memory _secondQuestion,
        string memory _secondRealAnswer,
        string memory _secondFakeAnswer1,
        string memory _secondFakeAnswer2
    ) public {
        require(
            msg.sender == managementWallet ||
                msg.sender == managementWallet2 ||
                msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        secondQuestion[videoID - 1] = _secondQuestion;

        secondRealAnswer[videoID - 1] = _secondRealAnswer;

        secondFakeAnswer1[videoID - 1] = _secondFakeAnswer1;

        secondFakeAnswer2[videoID - 1] = _secondFakeAnswer2;
    }

    function uploadThirdQuestion(
        string memory _thirdQuestion,
        string memory _thirdRealAnswer,
        string memory _thirdFakeAnswer1,
        string memory _thirdFakeAnswer2
    ) public {
        require(
            msg.sender == managementWallet ||
                msg.sender == managementWallet2 ||
                msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        thirdQuestion[videoID - 1] = _thirdQuestion;

        thirdRealAnswer[videoID - 1] = _thirdRealAnswer;

        thirdFakeAnswer1[videoID - 1] = _thirdFakeAnswer1;

        thirdFakeAnswer2[videoID - 1] = _thirdFakeAnswer2;
    }

    function answerVideo(
        string memory answer1,
        string memory answer2,
        string memory answer3,
        uint256 _videoID
    ) public {
        bool first = (keccak256(abi.encodePacked((answer1))) ==
            keccak256(abi.encodePacked((firstRealAnswer[_videoID]))));
        bool second = (keccak256(abi.encodePacked((answer2))) ==
            keccak256(abi.encodePacked((secondRealAnswer[_videoID]))));
        bool third = (keccak256(abi.encodePacked((answer3))) ==
            keccak256(abi.encodePacked((thirdRealAnswer[_videoID]))));

        videoAnswerOf[msg.sender][cycle] = first && second && third;

        emit AnswerVideo(block.timestamp, first && second && third, msg.sender);

        _updateALL(msg.sender);
    }

    function changeSorted() public {
        require(
            msg.sender == communityWallet ||
                msg.sender == managementWallet ||
                msg.sender == managementWallet2,
            "You are not qualified to call this function"
        );
        sort = !sort;
    }

    function changeUSDC(address _newCoin, uint256 _decimals) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not able to call this function"
        );
        USDC = ERC20(_newCoin);
        USDC_DECIMALS = _decimals;
    }

    function changeUSDT(address _newCoin, uint256 _decimals) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not able to call this function"
        );
        USDT = ERC20(_newCoin);
        USDT_DECIMALS = _decimals;
    }

    function changeBUSD(address _newCoin, uint256 _decimals) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not able to call this function"
        );
        BUSD = ERC20(_newCoin);
        BUSD_DECIMALS = _decimals;
    }

    function changeCommunityWallet(address newAddress) public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function."
        );

        communityWallet = payable(newAddress);
    }

    function viewClaimStableCoin(address wallet) public view returns (uint256) {
        if (qualifiedDonationBalance == 0 || !canReclaim(wallet)) return 0;

        uint256 amount = ((rewardAmount[rewardIDonClaim] *
            donationBalance[wallet]) / qualifiedDonationBalance);
        uint256 amountClaimed = rewardAmountClaimed[rewardIDonClaim];
        uint256 amountRaised = rewardAmount[rewardIDonClaim];

        if (amountRaised < (amountClaimed + amount)) {
            amount = (amountRaised - amountClaimed);
        }

        if (amount > (donationBalance[wallet] * POTENCIAL))
            return donationBalance[wallet] * POTENCIAL;

        return amount;
    }

    function qualifiedForBDD(address wallet) public view returns (bool) {
        return (donationBalance[wallet] >= minAmountToQualify);
    }

    function qualifiedForSAVER(address wallet) public view returns (bool) {
        return (_balances[wallet] > donationBalance[wallet]);
    }

    function qualifiedForUSDT(address wallet) public view returns (bool) {
        return (getBalanceOfUSDT(wallet) > donationBalance[wallet]);
    }

    function qualifiedForUSDC(address wallet) public view returns (bool) {
        return (getBalanceOfUSDC(wallet) > donationBalance[wallet]);
    }

    function qualifiedForDonatePerDay(
        address wallet
    ) public view returns (bool) {
        if (donationBalance[wallet] == 0) return false;

        if (cycle > 1) {
            return (donationBalancePerCycle[wallet][cycle - 1] >=
                getZeroPointNinePercent(
                    donationBalancePerCycle[wallet][cycle - 2]
                ));
        }

        return true;
    }

    function getSavingsLimit(address wallet) public view returns (uint256) {
        return ((usdcRecord[wallet][cycle - 1] * 100369) / 100000);
    }

    function getZeroPointNinePercent(
        uint256 amount
    ) public pure returns (uint256) {
        return (amount * 1009) / 1000;
    }

    function qualifiedForVideo(address wallet) public view returns (bool) {
        return videoAnswerOf[wallet][cycle - 1];
    }

    function getMinAmountToDonate(
        address wallet
    ) public view returns (uint256) {
        if (
            getZeroPointNinePercent(
                donationBalancePerCycle[wallet][cycle - 1]
            ) > donationBalance[wallet]
        ) {
            return
                getZeroPointNinePercent(
                    donationBalancePerCycle[wallet][cycle - 1]
                ) - donationBalance[wallet];
        }

        return 0;
    }

    function qualifiedForSinergy(address wallet) public view returns (bool) {
        bool bronze = false;
        bool silver = false;
        bool gold = false;

        if (SinergyBronze != ERC721(address(0))) {
            bronze = SinergyBronze.balanceOf(wallet) > 0;
        }

        if (SinergySilver != ERC721(address(0))) {
            silver = SinergySilver.balanceOf(wallet) > 0;
        }

        if (SinergyGold != ERC721(address(0))) {
            gold = SinergyGold.balanceOf(wallet) > 0;
        }

        return (bronze || silver || gold);
    }

    function canReclaim(address wallet) public view returns (bool) {
        if (wallet == communityWallet || wallet == devWallet) return true;

        return (qualifiedSinergy[wallet][cycle - 1] &&
            qualifiedUSDT[wallet][cycle - 1] &&
            qualifiedUSDC[wallet][cycle - 1] &&
            qualifiedSaver[wallet][cycle - 1] &&
            qualifiedBDD[wallet][cycle - 1] &&
            qualifiedDonatedPerDay[wallet][cycle - 1] &&
            qualifiedVideo[wallet][cycle - 1]);
    }

    function canReclaimSaver(address wallet) public view returns (bool) {
        return (canReclaim(wallet) && isListedToClaimSaver[wallet]);
    }

    // Esta funcion la agregamos porque fallaba el premio able (28-10-2022)
    // Pero luego nos dimos cuenta que estaba bien
    function canReclaimAble(address wallet) public view returns (bool) {
        bool res = true;

        if (cycle < CYCLES_FOR_SAVER_REWARD) return false;

        for (uint256 i = cycle - CYCLES_FOR_SAVER_REWARD; i < cycle; i++) {
            res = res && qualifiedHistory[wallet][i];
        }

        return res;
    }

    /*
        Si los decimales son distintos a 18, entonces para tratar a todos los tokens con 18 decimales retornamos
        el balance que dice el contrato del token multiplicado por 10 elevado a la diferencia de 18 y los decimales
        de ese token.
        Por ejemplo: USDC (6 Decimales)
        Como sus decimales son distintos a 18, hara lo siguiente. El balance que retorne el contrato de USDC en
        6 decimales le agregara 12 decimales mas. (18 - DECIMALS).
        Para asi finalmente tratarlo como un token de 18 decimales.
    */

    function getBalanceOfUSDC(address wallet) public view returns (uint256) {
        if (USDC_DECIMALS == 18) {
            return USDC.balanceOf(wallet);
        }
        return USDC.balanceOf(wallet) * 10 ** (18 - USDC_DECIMALS);
    }

    function getBalanceOfUSDT(address wallet) public view returns (uint256) {
        if (USDT_DECIMALS == 18) {
            return USDT.balanceOf(wallet);
        }
        return USDT.balanceOf(wallet) * 10 ** (18 - USDT_DECIMALS);
    }

    function getBalanceOfBUSD(address wallet) public view returns (uint256) {
        if (BUSD_DECIMALS == 18) {
            return BUSD.balanceOf(wallet);
        }
        return BUSD.balanceOf(wallet) * 10 ** (18 - BUSD_DECIMALS);
    }

    function updateTimestampRewards() public {
        if (block.timestamp > timeOpenClaimReward[rewardID]) {
            // If someone forgot to claim, this reward will appear on the next reward
            rewardAmount[rewardID] += (rewardAmount[rewardIDonClaim] -
                rewardAmountClaimed[rewardIDonClaim]);

            cycle++;
            emit CycleChange(block.timestamp, cycle);

            rewardIDonClaim = rewardID;
            rewardID++;

            // Update times to claim
            timeOpenClaimReward[rewardID] =
                block.timestamp +
                timeStableCoinReward;
        }
    }

    function updateALL(address wallet) public {
        updateTimestampRewards();
        updateSavings(wallet);
        updateQualifiedDonationBalance(wallet);
        checkDay(wallet);
        checkSaverReward(wallet);

        if (SinergyBronze != ERC721(address(0))) {
            SinergyBronze.updateFromAble();
        }

        if (SinergySilver != ERC721(address(0))) {
            SinergySilver.updateFromAble();
        }

        if (SinergyGold != ERC721(address(0))) {
            SinergyGold.updateFromAble();
        }

        emit Update(block.timestamp, wallet);
    }

    function _updateALL(address wallet) private {
        updateTimestampRewards();
        updateSavings(wallet);
        updateQualifiedDonationBalance(wallet);
        checkDay(wallet);
        checkSaverReward(wallet);

        if (SinergyBronze != ERC721(address(0))) {
            SinergyBronze.updateFromAble();
        }

        if (SinergySilver != ERC721(address(0))) {
            SinergySilver.updateFromAble();
        }

        if (SinergyGold != ERC721(address(0))) {
            SinergyGold.updateFromAble();
        }
    }

    function updateFromSinergy(address wallet) public {
        updateTimestampRewards();
        updateSavings(wallet);
        updateQualifiedDonationBalance(wallet);
        checkDay(wallet);
        checkSaverReward(wallet);
    }

    function setPersonalPurpose(string memory _str) public {
        personalPurpose[msg.sender] = _str;
    }

    function setCommunityPurpose(string memory _str) public {
        communityPurpose[msg.sender] = _str;
    }

    function withdrawAllFunds() public {
        require(
            (block.timestamp - lastDonationTimestamp) > 1 days,
            "The contract is still working"
        );
        require(
            msg.sender == communityWallet,
            "You are not qualified to call to this function"
        );

        require(
            BUSD.transfer(msg.sender, address(this).balance),
            "Cannot pay StableCoin"
        );
    }

    function setManagementInfo(string memory info) public {
        require(
            msg.sender == managementWallet || msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        managementInfo = info;
    }

    function changeManagementWallet(address _managementWallet) public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        managementWallet = _managementWallet;
    }

    function changeManagementWallet2(address _managementWallet) public {
        require(
            msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        managementWallet2 = _managementWallet;
    }

    function set_potencial(uint256 _potencial) public {
        require(
            msg.sender == communityWallet || msg.sender == devWallet,
            "You are not qualified to call this function."
        );
        POTENCIAL = _potencial;
    }

    function setSinergyBronze(address _sinergyBronze) public {
        require(
            msg.sender == devWallet,
            "You are not qualified to call this function"
        );

        SinergyBronze = ERC721(_sinergyBronze);
    }

    function setSinergySilver(address _sinergySilver) public {
        require(
            msg.sender == devWallet,
            "You are not qualified to call this function"
        );

        SinergySilver = ERC721(_sinergySilver);
    }

    function setSinergyGold(address _sinergyGold) public {
        require(
            msg.sender == devWallet,
            "You are not qualified to call this function"
        );

        SinergyGold = ERC721(_sinergyGold);
    }

    function setSinergySell(SinergySale _ableSale) public {
        require(msg.sender == devWallet);
        ABLE_SALE = _ableSale;
    }

    // Private funcs
    function updateQualifiedDonationBalanceAfterDonate(
        address wallet,
        uint256 amount
    ) private {
        bool previousStatus = isQualified[wallet];

        if (isQualified[wallet]) {
            qualifiedDonationBalance -= donationBalance[wallet];
            isQualified[wallet] = false;
            total_qualified_wallets--;
            qualifiedHolders--;
        }

        if (donationBalance[wallet] == 0) {
            wallets_with_donation_balance++;
        }

        donationBalance[wallet] += amount;
        totalDonationBalance += amount;

        if (canReclaim(wallet)) {
            qualifiedDonationBalance += donationBalance[wallet];
            isQualified[wallet] = true;
            total_qualified_wallets++;
            qualifiedHolders++;
        }

        if (previousStatus != isQualified[wallet]) {
            emit UserQualification(block.timestamp, wallet, !previousStatus);
        }
    }

    function updateQualifiedDonationBalance(address wallet) private {
        bool previousStatus = isQualified[wallet];

        if (isQualified[wallet]) {
            qualifiedDonationBalance -= donationBalance[wallet];
            isQualified[wallet] = false;
            total_qualified_wallets--;
            qualifiedHolders--;
        }

        if (canReclaim(wallet)) {
            qualifiedDonationBalance += donationBalance[wallet];
            isQualified[wallet] = true;
            total_qualified_wallets++;
            qualifiedHolders++;
        }

        if (previousStatus != isQualified[wallet]) {
            emit UserQualification(block.timestamp, wallet, !previousStatus);
        }
    }

    function updateSavings(address wallet) private {
        uint256 last_saving_amount = lastAmountUSDC[wallet] +
            lastAmountUSDT[wallet];
        uint256 actual_saving_amount = getBalanceOfUSDC(wallet) +
            getBalanceOfUSDT(wallet);

        if (actual_saving_amount < last_saving_amount) {
            uint256 dif = last_saving_amount - actual_saving_amount;

            if (dif > donationBalance[wallet]) {
                reduceDonationBalance(wallet, donationBalance[wallet]);
            } else {
                reduceDonationBalance(wallet, dif);
            }
        }
    }

    function checkSaverReward(address wallet) private {
        if (!canReclaim(wallet) && isListedToClaimSaver[wallet]) {
            isListedToClaimSaver[wallet] = false;
            emit AbleRewardQualification(block.timestamp, wallet, false);
            return;
        }

        if (canReclaim(wallet) && !isListedToClaimSaver[wallet]) {
            isListedToClaimSaver[wallet] = true;
            cycleToSaverReward[wallet] = cycle + CYCLES_FOR_SAVER_REWARD;
            emit AbleRewardQualification(block.timestamp, wallet, true);
            return;
        }
    }

    // antes llamada checkDonatedByDay
    function checkDay(address wallet) private {
        if (cycle >= cycleToCheck[wallet]) {
            cycleToCheck[wallet] = cycle + 1;

            lastAmountUSDC[wallet] = getBalanceOfUSDC(wallet);
            lastAmountUSDT[wallet] = getBalanceOfUSDT(wallet);

            usdcRecord[wallet][cycle] = lastAmountUSDC[wallet];
            usdtRecord[wallet][cycle] = lastAmountUSDT[wallet];

            donationBalancePerCycle[wallet][cycle - 1] = donationBalance[
                msg.sender
            ];
            qualifiedSinergy[wallet][cycle - 1] = qualifiedForSinergy(wallet);
            qualifiedSaver[wallet][cycle - 1] = qualifiedForSAVER(wallet);
            qualifiedUSDT[wallet][cycle - 1] = qualifiedForUSDT(wallet);
            qualifiedUSDC[wallet][cycle - 1] = qualifiedForUSDC(wallet);
            qualifiedBDD[wallet][cycle - 1] = qualifiedForBDD(wallet);
            qualifiedDonatedPerDay[wallet][
                cycle - 1
            ] = qualifiedForDonatePerDay(wallet);
            qualifiedVideo[wallet][cycle - 1] = qualifiedForVideo(wallet);

            qualifiedHistory[wallet][cycle - 1] = canReclaim(wallet);

            emit CloseCycle(
                wallet,
                cycle - 1,
                qualifiedSinergy[wallet][cycle - 1],
                qualifiedUSDT[wallet][cycle - 1],
                qualifiedUSDC[wallet][cycle - 1],
                qualifiedSaver[wallet][cycle - 1],
                qualifiedBDD[wallet][cycle - 1],
                qualifiedDonatedPerDay[wallet][cycle - 1],
                qualifiedVideo[wallet][cycle - 1]
            );
        }
    }

    // Esta nueva funcion la tiene que llamar SinergySale cada vez que alguien compra ABLE
    function incrementDonationBalance(
        uint256 amount_spended,
        address wallet
    ) public {
        require(msg.sender == address(ABLE_SALE));
        updateQualifiedDonationBalanceAfterDonate(wallet, amount_spended);
        _updateALL(wallet);
        if (canReclaim(wallet)) {
            lastDonationFrom = msg.sender;
        }
        rewardAmount[rewardID] += (amount_spended / 3);
        allDonatesOf[wallet] += amount_spended;
        donatedByDayOf[wallet][cycle] += amount_spended;
        claimFrom[wallet] = rewardID;
        totalDonations++;

        total_raised_for_admin += (amount_spended / 3);

        lastDonationTimestamp = block.timestamp;

        // Emit Event
        emit Points(wallet, cycle, amount_spended, true);
    }

    function reduceDonationBalance(address wallet, uint256 amount) private {
        bool previousStatus = isQualified[wallet];

        if (isQualified[wallet]) {
            qualifiedDonationBalance -= donationBalance[wallet];
            isQualified[wallet] = false;
            total_qualified_wallets--;
            qualifiedHolders--;
        }

        donationBalance[wallet] -= amount;
        totalDonationBalance -= amount;

        if (donationBalance[wallet] == 0) {
            wallets_with_donation_balance--;
        }

        if (canReclaim(wallet)) {
            qualifiedDonationBalance += donationBalance[wallet];
            isQualified[wallet] = true;
            total_qualified_wallets++;
            qualifiedHolders++;
        }

        if (previousStatus != isQualified[wallet]) {
            emit UserQualification(block.timestamp, wallet, !previousStatus);
        }

        // Emit Event
        emit Points(wallet, cycle, amount, false);
    }

    // Funcs Private view

    // Funcs IERC20

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, _allowances[owner][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = _allowances[owner][spender];
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        if (!isHolder[to]) {
            totalHolders++;
            isHolder[to] = true;
        }

        uint256 fromBalance = _balances[from];
        require(
            fromBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        if (_balances[from] == 0) {
            totalHolders--;
            isHolder[from] = false;
        }

        _updateALL(from);
        _updateALL(to);

        updateQualifiedDonationBalance(from);
        updateQualifiedDonationBalance(to);

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

contract SinergySale {
    // Constants
    uint256 public constant TIME_OF_CYCLE = 6 minutes;

    uint256 public MAX_AMOUNT_SELL_TOKEN = 90 ether;
    uint256 public MIN_AMOUNT_SELL_TOKEN = 9 ether;
    uint256 public TOKEN_PRICE = 3;
    uint256 public LIMIT_POST_BY_CYCLE = 1;

    // Global Variables
    uint256 public TOTAL_TOKENS_SOLD;
    mapping(uint256 => uint256) public tokens_sold_by_cycle;

    // ERC20 Contracts
    ERC20 public ABLE;
    ERC20 public TOKEN;
    ERC20 public BUSD;

    // ERC721 Contract
    Sinergy public SinergyContract =
        Sinergy(0x508c132EE7cBb4A666E661634F85B59158eaDB4B);

    // Wallets
    address payable public communityWallet =
        payable(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
    address public dev_wallet = 0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    // Sell List
    uint256[] public sell_list;
    mapping(uint256 => bool) public is_in_sell_list;
    mapping(address => uint256) public timestamp_last_post_sell;
    mapping(address => uint256) public amount_of_post_of;

    // Driven List
    uint256[] public driven_list;
    mapping(uint256 => bool) public is_in_driven_list;
    mapping(address => uint256) public turns_in_driven_list_of;

    // Turn of pick
    uint256 public turn; // 0 y 1 => Driven List ||| 2 => Sell List

    // Amount on Sell
    uint256 public total_selling_amount;
    mapping(uint256 => uint256) public selling_amount_of;
    mapping(address => uint256) public post_count_of;

    // User Data
    mapping(address => uint256) public amount_sold_of;

    // Events
    event SellList(uint256 indexed nft_id, bool comeIn, bool driven);

    event SellToken(
        uint256 indexed nft_id,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event SwapList(uint256 indexed nft_id);

    event BackToQueue(uint256 indexed nft_id, uint256 posAnt, uint256 posAct);

    // Constructor
    constructor(ERC20 _able, ERC20 _busd, ERC20 _token) {
        ABLE = _able;
        TOKEN = _token;
        BUSD = _busd;
    }

    // Public Methods
    function sell(uint256 _amount, uint256 _tokenID) public {
        require(
            _amount >= MIN_AMOUNT_SELL_TOKEN,
            "The amount to sell have to be more or equal than 9 and less or equal than 90."
        );
        require(
            (selling_amount_of[_tokenID] + _amount) <= MAX_AMOUNT_SELL_TOKEN,
            "The amount to sell have to be more or equal than 9 and less or equal than 90."
        );
        require(
            SinergyContract.ownerOf(_tokenID) == msg.sender,
            "You are not the owner of this NFT."
        );
        require(
            !is_selling(_tokenID),
            "You are already selling tokens on SinergySell"
        );
        require(
            TOKEN.transferFrom(msg.sender, address(this), _amount),
            "Transfer fails."
        );
        require(
            block.timestamp > timestamp_last_post_sell[msg.sender],
            "You have to wait to post another sell."
        );

        selling_amount_of[_tokenID] += _amount;
        total_selling_amount += _amount;
        timestamp_last_post_sell[msg.sender] = block.timestamp + TIME_OF_CYCLE;

        if (can_be_in_driven_list(msg.sender)) {
            set_nft_to_driven_list(_tokenID);
            turns_in_driven_list_of[msg.sender]++;
        } else {
            set_nft_to_sell_list(_tokenID);
        }
    }

    function buy(uint256 _amount, bool incrementBDD) public {
        require(_amount <= total_selling_amount);
        // Transferimos los BUSD a este contrato
        BUSD.transferFrom(msg.sender, address(this), _amount * TOKEN_PRICE);

        // El 33% que va para el vendedor de los tokens, se envian directamente a la billetera del vendedor.
        // Esto se hace en la funcion sell_able_from_list

        // Transferimos 33% para el Admin
        BUSD.transfer(communityWallet, ((_amount * TOKEN_PRICE) / 3));

        // Transferimos 33% para Able, para que lo otorgue en el regalo diario de Able.
        BUSD.transfer(address(ABLE), ((_amount * TOKEN_PRICE) / 3));

        // Transferimos los TOKEN al usuario
        TOKEN.transfer(msg.sender, _amount);

        // Buscamos los vendedores
        uint256 nfts_to_remove_sell;
        uint256 nfts_to_remove_driven;

        (nfts_to_remove_sell, nfts_to_remove_driven) = find_sellers(
            _amount,
            msg.sender
        );

        // Eliminamos de la lista, los vendedores que vendieron el total de su capital.
        for (uint256 i = 0; i < nfts_to_remove_sell; i++) {
            remove_first_nft_from_sell_list();
        }

        for (uint256 i = 0; i < nfts_to_remove_driven; i++) {
            remove_first_nft_from_driven_list();
        }

        // Aumentamos el BDD de esta billetera en ABLE
        if (incrementBDD)
            ABLE.incrementDonationBalance(_amount * TOKEN_PRICE, msg.sender);

        // Aumentamos la cantidad de tokens vendidos.
        TOTAL_TOKENS_SOLD += _amount;
        tokens_sold_by_cycle[ABLE.cycle()] += _amount;
    }

    function quit_sell(uint256 tokenID) public {
        require(is_selling(tokenID));
        require(SinergyContract.ownerOf(tokenID) == msg.sender);
        require(selling_amount_of[tokenID] > 0);
        require(total_selling_amount >= selling_amount_of[tokenID]);
        require(TOKEN.transfer(msg.sender, selling_amount_of[tokenID]));

        // Descontamos el monto que se saca de la venta
        total_selling_amount -= selling_amount_of[tokenID];
        selling_amount_of[tokenID] = 0;

        // Sacamos al NFT de la Lista de Venta TOKEN
        if (is_in_sell_list[tokenID]) {
            remove_nft_from_sell_list(get_index_of_nft_from_sell_list(tokenID));
        } else {
            remove_nft_from_driven_list(
                get_index_of_nft_from_driven_list(tokenID)
            );
        }
    }

    // Check Methods
    function check_sell_list() public {
        // Chequeamos si algun NFT de la Lista de Venta de Able esta descalificado.
        for (uint256 i = 0; i < sell_list.length; i++) {
            uint256 nft_id = sell_list[i];
            if (!SinergyContract.nft_was_qualified(nft_id)) {
                // Traemos todos los NFTs que habia detras una posicion mas adelante
                for (uint256 j = i; j < sell_list.length - 1; j++) {
                    sell_list[j] = sell_list[j + 1];
                }

                // Posicionamos al NFT sancionado en el ultimo lugar de la cola
                sell_list[sell_list.length - 1] = nft_id;

                emit BackToQueue(nft_id, i, sell_list.length - 1);
            }
        }
    }

    function check_driven_list() public {
        // Chequeamos si algun NFT de la Lista de Venta de Able esta descalificado.
        for (uint256 i = 0; i < driven_list.length; i++) {
            uint256 nft_id = driven_list[i];
            if (!SinergyContract.nft_was_qualified(nft_id)) {
                // Traemos todos los NFTs que habia detras una posicion mas adelante
                for (uint256 j = i; j < driven_list.length - 1; j++) {
                    driven_list[j] = sell_list[j + 1];
                }

                // Posicionamos al NFT sancionado en el ultimo lugar de la cola
                driven_list[driven_list.length - 1] = nft_id;

                emit BackToQueue(nft_id, i, driven_list.length - 1);
            }
        }
    }

    // Get Methods
    function get_sell_list_length() public view returns (uint256) {
        return sell_list.length;
    }

    function get_driven_list_length() public view returns (uint256) {
        return driven_list.length;
    }

    // Communication
    function try_to_swap(uint256 _tokenID) public {
        require(
            msg.sender == address(SinergyContract),
            "Only SinergyContract can call to this function."
        );

        if (
            is_selling(_tokenID) &&
            is_in_sell_list[_tokenID] &&
            (get_index_of_nft_from_sell_list(_tokenID) > driven_list.length)
        ) {
            remove_nft_from_sell_list(
                get_index_of_nft_from_sell_list(_tokenID)
            );
            set_nft_to_driven_list(_tokenID);

            emit SwapList(_tokenID);
        }
    }

    function set_sinergy(address _sinergyContract) public {
        require(
            msg.sender == dev_wallet,
            "You are not qualified to call this function."
        );
        SinergyContract = Sinergy(_sinergyContract);
    }

    function set_limit_post_by_cycle(uint256 new_limit) public {
        require(
            msg.sender == communityWallet || msg.sender == dev_wallet,
            "You are not qualified to call this function."
        );
        LIMIT_POST_BY_CYCLE = new_limit;
    }

    function set_values_of_sale(
        uint256 max_amount,
        uint256 min_amount,
        uint256 price
    ) public {
        /*
            Ninguno de los parametros tienen que estar en WEI.
            Tienen que estar directamente en Ether.
        */
        require(
            msg.sender == dev_wallet || msg.sender == communityWallet,
            "You are not qualified to call this function"
        );

        MAX_AMOUNT_SELL_TOKEN = max_amount * 1 ether;
        MIN_AMOUNT_SELL_TOKEN = min_amount * 1 ether;
        TOKEN_PRICE = price;
    }

    // Helpers
    function is_selling(uint256 _tokenID) public view returns (bool) {
        return is_in_sell_list[_tokenID] || is_in_driven_list[_tokenID];
    }

    // Sell Helpers
    function is_sell_turn() public view returns (bool) {
        return (turn == 2);
    }

    function sell_list_is_empty() public view returns (bool) {
        return sell_list.length == 0;
    }

    function can_use_sell() public view returns (bool) {
        return (!sell_list_is_empty() &&
            (is_sell_turn() || driven_list_is_empty()));
    }

    // Driven Helpers
    function can_be_in_driven_list(address wallet) public view returns (bool) {
        return
            ABLE.winSaverReward(wallet) &&
            ABLE.winsSaverRewardOf(wallet) > turns_in_driven_list_of[wallet];
    }

    function is_driven_turn() public view returns (bool) {
        return turn == 0 || turn == 1;
    }

    function driven_list_is_empty() public view returns (bool) {
        return driven_list.length == 0;
    }

    function can_use_driven() public view returns (bool) {
        return (!driven_list_is_empty() &&
            (is_driven_turn() || sell_list_is_empty()));
    }

    // Private Methods
    function set_nft_to_sell_list(uint256 _tokenID) private {
        sell_list.push(_tokenID);
        is_in_sell_list[_tokenID] = true;

        emit SellList(_tokenID, true, false);
    }

    function set_nft_to_driven_list(uint256 _tokenID) private {
        driven_list.push(_tokenID);
        is_in_driven_list[_tokenID] = true;

        emit SellList(_tokenID, true, true);
    }

    function remove_first_nft_from_sell_list() private {
        require(sell_list.length > 0);

        uint256 nft_id = sell_list[0];

        for (uint256 i = 0; i < sell_list.length - 1; i++) {
            sell_list[i] = sell_list[i + 1];
        }

        sell_list.pop();

        is_in_sell_list[nft_id] = false;

        emit SellList(nft_id, false, false);
    }

    function remove_first_nft_from_driven_list() private {
        require(driven_list.length > 0);

        uint256 nft_id = driven_list[0];

        for (uint256 i = 0; i < driven_list.length - 1; i++) {
            driven_list[i] = driven_list[i + 1];
        }

        driven_list.pop();

        is_in_driven_list[nft_id] = false;

        emit SellList(nft_id, false, true);
    }

    function remove_nft_from_sell_list(uint256 idx) private {
        require(sell_list.length > idx);

        uint256 nft_id = sell_list[idx];

        for (uint256 i = idx; i < sell_list.length - 1; i++) {
            sell_list[i] = sell_list[i + 1];
        }

        sell_list.pop();

        is_in_sell_list[nft_id] = false;

        emit SellList(nft_id, false, false);
    }

    function remove_nft_from_driven_list(uint256 idx) private {
        require(driven_list.length > idx);

        uint256 nft_id = driven_list[idx];

        for (uint256 i = idx; i < driven_list.length - 1; i++) {
            driven_list[i] = driven_list[i + 1];
        }

        driven_list.pop();

        is_in_driven_list[nft_id] = false;

        emit SellList(nft_id, false, true);
    }

    function can_sell(address wallet) private returns (bool) {
        if (block.timestamp > timestamp_last_post_sell[wallet]) {
            post_count_of[wallet] = 0;
            return true;
        }

        if (post_count_of[wallet] < LIMIT_POST_BY_CYCLE) {
            post_count_of[wallet]++;
            return true;
        }

        return false;
    }

    function get_index_of_nft_from_sell_list(
        uint256 tokenID
    ) private view returns (uint256) {
        for (uint256 i = 0; i < sell_list.length; i++) {
            if (sell_list[i] == tokenID) {
                return i;
            }
        }

        return sell_list.length + 1;
    }

    function get_index_of_nft_from_driven_list(
        uint256 tokenID
    ) private view returns (uint256) {
        for (uint256 i = 0; i < driven_list.length; i++) {
            if (driven_list[i] == tokenID) {
                return i;
            }
        }

        return driven_list.length + 1;
    }

    function sell_able_from_list(
        uint256 _amount,
        uint256 _tokenID,
        address buyer
    ) private {
        address owner = SinergyContract.ownerOf(_tokenID);

        selling_amount_of[_tokenID] -= _amount;
        total_selling_amount -= _amount;

        // 33% van directo al usuario
        BUSD.transfer(owner, ((_amount * TOKEN_PRICE) / 3));
        amount_sold_of[owner] += ((_amount * TOKEN_PRICE) / 3);

        emit SellToken(_tokenID, buyer, owner, _amount);
    }

    // Turn Helper
    function increment_turn() private {
        if (turn == 2) {
            turn = 0;
        } else {
            turn++;
        }
    }

    function find_sellers(
        uint256 _amount,
        address buyer
    ) private returns (uint256, uint256) {
        bool sell_all = false;
        uint256 nft_id;

        uint256 idx_sell = 0;
        uint256 nfts_to_remove_sell;

        uint256 idx_driven = 0;
        uint256 nfts_to_remove_driven;

        while (!sell_all) {
            // Driven List
            while (
                can_use_driven() && idx_driven < driven_list.length && !sell_all
            ) {
                nft_id = driven_list[idx_driven];

                if (_amount <= selling_amount_of[nft_id]) {
                    // Este NFT me da lo que necesito.
                    if (_amount == selling_amount_of[nft_id]) {
                        nfts_to_remove_driven++;
                    }

                    sell_able_from_list(_amount, nft_id, buyer);
                    sell_all = true;
                } else {
                    // Este NFT me ayuda a alcanzar lo que necesito. No me es suficiente lo que me da.
                    _amount -= selling_amount_of[nft_id];
                    sell_able_from_list(
                        selling_amount_of[nft_id],
                        nft_id,
                        buyer
                    );
                    nfts_to_remove_driven++;
                }

                idx_driven++;
                increment_turn();
            }

            // Sell List
            while (can_use_sell() && idx_sell < sell_list.length && !sell_all) {
                nft_id = sell_list[idx_sell];

                if (_amount <= selling_amount_of[nft_id]) {
                    // Este NFT me da lo que necesito.
                    if (_amount == selling_amount_of[nft_id]) {
                        nfts_to_remove_sell++;
                    }

                    sell_able_from_list(_amount, nft_id, buyer);
                    sell_all = true;
                } else {
                    // Este NFT me ayuda a alcanzar lo que necesito. No me es suficiente lo que me da.
                    _amount -= selling_amount_of[nft_id];
                    sell_able_from_list(
                        selling_amount_of[nft_id],
                        nft_id,
                        buyer
                    );
                    nfts_to_remove_sell++;
                }

                idx_sell++;
                increment_turn();
            }
        }

        return (nfts_to_remove_sell, nfts_to_remove_driven);
    }
}

contract Reward {
    // Contracts
    ERC20 public ABLE = ERC20(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5);
    ERC20 public TOKEN = ERC20(0x68627b19b01C497749328e160e17a168D7719956);
    SinergySale public ABLE_SALE =
        SinergySale(0xD42058180A985DEe1b52aEAEa5573D069D87Dc94);
    Sinergy public SinergyContract =
        Sinergy(0x508c132EE7cBb4A666E661634F85B59158eaDB4B);

    // Wallets
    address public developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    // Attributes
    uint256 public TIME = 6 minutes;
    uint256 public reward_id;
    uint256 public AMOUNT_USERS_NEED_TO_CLAIM = 3;
    mapping(uint256 => uint256) public reward;
    mapping(uint256 => uint256) public reward_claimed;
    mapping(address => uint256) public timestamp_to_claim_reward;

    event RewardClaimed(uint256 amount, address indexed wallet);

    function set_reward(uint256 amount) public {
        require(can_call(msg.sender));
        reward[reward_id] += amount;
    }

    function claim_reward(bool passive) public {
        require(
            can_claim(msg.sender, passive),
            "You are not qualified to claim this reward."
        );
        uint256 amount = view_amount_to_claim(msg.sender, passive);

        // Transferimos los tokens correspondientes
        TOKEN.transfer(msg.sender, amount);

        set_reward_claimed(msg.sender, amount);

        emit RewardClaimed(amount, msg.sender);
    }

    function set_reward_claimed(address wallet, uint256 amount) private {
        reward_claimed[reward_id - 1] += amount;
        timestamp_to_claim_reward[wallet] = block.timestamp + TIME;
    }

    function view_amount_to_claim(
        address wallet,
        bool passive
    ) public view returns (uint256) {
        if (reward_id == 0) return 0;
        if (block.timestamp <= timestamp_to_claim_reward[wallet]) return 0;

        uint256 user_amount = get_user_amount(wallet, passive);
        uint256 total_amount = get_total_amount(passive);

        if (user_amount == 0) return 0;
        if (total_amount < user_amount) return 0;
        if (user_amount > 9) user_amount = 9;

        uint256 amount_to_claim = (user_amount * reward[reward_id - 1]) /
            total_amount;

        if (
            amount_to_claim >
            (reward[reward_id - 1] - reward_claimed[reward_id - 1])
        ) {
            return (reward[reward_id - 1] - reward_claimed[reward_id - 1]);
        }

        return amount_to_claim;
    }

    function update() public {
        require(can_call(msg.sender));
        reward_id++;
        if (reward[reward_id - 1] > reward_claimed[reward_id - 1]) {
            reward[reward_id] += (reward[reward_id - 1] -
                reward_claimed[reward_id - 1]);
        }
    }

    function can_claim(
        address wallet,
        bool passive
    ) public view returns (bool) {
        if (passive) {
            return (reward_id > 0 &&
                block.timestamp > timestamp_to_claim_reward[wallet] &&
                ABLE.canReclaim(wallet));
        }

        return (reward_id > 0 &&
            block.timestamp > timestamp_to_claim_reward[wallet] &&
            ABLE.canReclaim(wallet) &&
            ABLE.totalWinsSaverReward() >= AMOUNT_USERS_NEED_TO_CLAIM &&
            ABLE.winsSaverRewardOf(wallet) > 0);
    }

    function set_contracts(
        ERC20 _able,
        ERC20 _token,
        SinergySale _sinergySale,
        Sinergy _sinergyContract
    ) public {
        require(
            msg.sender == developmentWallet,
            "You are not qualified to call this function"
        );
        ABLE = _able;
        TOKEN = _token;
        ABLE_SALE = _sinergySale;
        SinergyContract = _sinergyContract;
    }

    // Getters
    function get_amount_raised() public view returns (uint256) {
        if (reward_id == 0) return 0;
        return reward[reward_id - 1];
    }

    function get_amount_claimed() public view returns (uint256) {
        if (reward_id == 0) return 0;
        return reward_claimed[reward_id - 1];
    }

    function can_call(address wallet) private view returns (bool) {
        return
            wallet == address(ABLE) ||
            wallet == address(ABLE_SALE) ||
            wallet == address(SinergyContract) ||
            wallet == developmentWallet;
    }

    function get_user_amount(
        address wallet,
        bool passive
    ) private view returns (uint256) {
        if (passive) {
            return SinergyContract.balanceOf(wallet);
        }

        return ABLE.winsSaverRewardOf(wallet);
    }

    function get_total_amount(bool passive) private view returns (uint256) {
        if (passive) {
            return SinergyContract.nfts_qualified();
        }

        return ABLE.totalWinsSaverReward();
    }
}

// This is the main contract here!
contract Migration {
    // Constants
    uint256 public constant AMOUNT_LIMIT_TO_MIGRATE = 21;

    // Contracts
    SinergyMigration ContractMigration =
        SinergyMigration(0xEa063b5A744616a161272a013a626A1cBD80Ee1B);
    Sinergy Contract = Sinergy(0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6);

    // ERC20
    ERC20 public ABLE = ERC20(0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5);

    // Addresses
    address public communityWallet = 0xc8895f6f85D870589C42fd6d531c855bddD27B0f;
    address public constant developmentWallet =
        0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5;

    // Migration
    mapping(address => bool) public isRecover;
    mapping(uint256 => bool) public nftRecover;

    mapping(uint256 => bool) public first_level_references_recover;
    mapping(uint256 => uint256) public first_level_references_recover_amount;

    mapping(uint256 => bool) public second_level_references_recover;
    mapping(uint256 => uint256) public second_level_references_recover_amount;

    mapping(uint256 => bool) public third_level_references_recover;
    mapping(uint256 => uint256) public third_level_references_recover_amount;

    mapping(uint256 => bool) public four_level_references_recover;
    mapping(uint256 => uint256) public four_level_references_recover_amount;

    mapping(uint256 => bool) public five_level_references_recover;
    mapping(uint256 => uint256) public five_level_references_recover_amount;

    mapping(uint256 => bool) public six_level_references_recover;
    mapping(uint256 => uint256) public six_level_references_recover_amount;

    mapping(uint256 => bool) public seven_level_references_recover;
    mapping(uint256 => uint256) public seven_level_references_recover_amount;

    mapping(uint256 => bool) public eight_level_references_recover;
    mapping(uint256 => uint256) public eight_level_references_recover_amount;

    mapping(uint256 => bool) public nine_level_references_recover;
    mapping(uint256 => uint256) public nine_level_references_recover_amount;

    mapping(address => uint256) public nfts_migrated;
    uint256 public starting_nft_id;
    uint256[] public recovered_nfts;
    uint256 public recovered_nfts_amount;

    constructor() {
        isRecover[developmentWallet] = true;
    }

    // Main recover
    function migrate() public {
        if (msg.sender == communityWallet && !isRecover[communityWallet]) {
            Contract.create_genesis_nfts();
            isRecover[communityWallet] = true;
            handle_recover_nfts_amount_for_admin();
            return;
        }

        if (!isRecover[msg.sender]) {
            uint256 affiliate_rewards;
            uint256 amount = ContractMigration.balanceOf(msg.sender);
            uint256 migrated;
            uint256 nftID;

            while (
                migrated < AMOUNT_LIMIT_TO_MIGRATE &&
                nfts_migrated[msg.sender] < amount
            ) {
                nftID = ContractMigration.get_my_nfts(
                    msg.sender,
                    nfts_migrated[msg.sender]
                );
                recovered_nfts.push(nftID);

                Contract.handleRecover(msg.sender, nftID);
                nftRecover[nftID] = true;

                recovered_nfts_amount++;
                affiliate_rewards += ContractMigration.get_nft_balance_to_claim(
                    nftID
                );

                nfts_migrated[msg.sender]++;
                migrated++;
            }

            if (nfts_migrated[msg.sender] == amount) {
                ABLE.transfer(msg.sender, affiliate_rewards);
                isRecover[msg.sender] = true;
            }
        }
    }

    // Recover by level
    function recoverFirstLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !first_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_first_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            first_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverFirstLevel(
                nftID,
                first_level_references_recover_amount[nftID]
            );
            migrated++;
            first_level_references_recover_amount[nftID]++;
        }

        if (first_level_references_recover_amount[nftID] == amount) {
            first_level_references_recover[nftID] = true;
        }
    }

    function recoverSecondLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !second_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_second_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            second_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverSecondLevel(
                nftID,
                second_level_references_recover_amount[nftID]
            );
            migrated++;
            second_level_references_recover_amount[nftID]++;
        }

        if (second_level_references_recover_amount[nftID] == amount) {
            second_level_references_recover[nftID] = true;
        }
    }

    function recoverThirdLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !third_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_third_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            third_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverThirdLevel(
                nftID,
                third_level_references_recover_amount[nftID]
            );
            migrated++;
            third_level_references_recover_amount[nftID]++;
        }

        if (third_level_references_recover_amount[nftID] == amount) {
            third_level_references_recover[nftID] = true;
        }
    }

    function recoverFourLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !four_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_four_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            four_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverFourLevel(
                nftID,
                four_level_references_recover_amount[nftID]
            );
            migrated++;
            four_level_references_recover_amount[nftID]++;
        }

        if (four_level_references_recover_amount[nftID] == amount) {
            four_level_references_recover[nftID] = true;
        }
    }

    function recoverFiveLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !five_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_five_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            five_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverFiveLevel(
                nftID,
                five_level_references_recover_amount[nftID]
            );
            migrated++;
            five_level_references_recover_amount[nftID]++;
        }

        if (five_level_references_recover_amount[nftID] == amount) {
            five_level_references_recover[nftID] = true;
        }
    }

    function recoverSixLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !six_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_six_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            six_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverSixLevel(
                nftID,
                six_level_references_recover_amount[nftID]
            );
            migrated++;
            six_level_references_recover_amount[nftID]++;
        }

        if (six_level_references_recover_amount[nftID] == amount) {
            six_level_references_recover[nftID] = true;
        }
    }

    function recoverSevenLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !seven_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_seven_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            seven_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverSevenLevel(
                nftID,
                seven_level_references_recover_amount[nftID]
            );
            migrated++;
            seven_level_references_recover_amount[nftID]++;
        }

        if (seven_level_references_recover_amount[nftID] == amount) {
            seven_level_references_recover[nftID] = true;
        }
    }

    function recoverEightLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !eight_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_eight_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            eight_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverEightLevel(
                nftID,
                eight_level_references_recover_amount[nftID]
            );
            migrated++;
            eight_level_references_recover_amount[nftID]++;
        }

        if (eight_level_references_recover_amount[nftID] == amount) {
            eight_level_references_recover[nftID] = true;
        }
    }

    function recoverNineLevelReferences(uint256 nftID) public {
        require(
            msg.sender == Contract.ownerOf(nftID) &&
                !nine_level_references_recover[nftID]
        );

        uint256 migrated;
        uint256 amount = ContractMigration.get_nine_level_amount_reference(
            nftID
        );
        while (
            migrated < AMOUNT_LIMIT_TO_MIGRATE &&
            nine_level_references_recover_amount[nftID] < amount
        ) {
            Contract.handlerRecoverNineLevel(
                nftID,
                nine_level_references_recover_amount[nftID]
            );
            migrated++;
            nine_level_references_recover_amount[nftID]++;
        }

        if (nine_level_references_recover_amount[nftID] == amount) {
            nine_level_references_recover[nftID] = true;
        }
    }

    // Helpers
    function handle_recover_nfts_amount_for_admin() private {
        for (uint8 i = 0; i < 9; i++) {
            recovered_nfts.push(i);
            recovered_nfts_amount++;
        }
    }

    // Set Contracts
    function set_sinergy(Sinergy _sinergyAddress) public {
        if (msg.sender != developmentWallet) return;
        Contract = Sinergy(_sinergyAddress);
    }

    function set_able(ERC20 _able) public {
        if (msg.sender != developmentWallet) return;
        ABLE = ERC20(_able);
    }
}