// SPDX-License-Identifier: MIT
 
// NFT Signature 0xc2395378e8EDCEA662DaeEe9Aa3E2804a114DC11
 
// Name: Dardo
// Image: https://i.ibb.co/sPpFqK8/dardito.png
// Description: Dapp Design, Contract Architecture & Contract Developer
// address dev1 = 0x1C9172C7AB94D364CdD2e3FfbBF2c1E53Ea91d2f;
 
// Name: Guaní
// Image: https://i.ibb.co/LRnh7bT/guani.png
// Description: Creatividad y producción || Creativity & Production
// address dev2 = 0x0Fa6b9c5F2c265e8Cc48aCA380c2E5e583b54b5C;
 
pragma solidity ^0.8.0;
 
interface IERC20 
{
 
   function totalSupply() external view returns (uint256);
 
   function balanceOf(address account) external view returns (uint256);
 
   function transfer(address to, uint256 amount) external returns (bool);
 
   function allowance(address owner, address spender) external view returns (uint256);
 
   function approve(address spender, uint256 amount) external returns (bool);
 
   function transferFrom(
       address from,
       address to,
       uint256 amount
   ) external returns (bool);
 
   event Transfer(address indexed from, address indexed to, uint256 value);
 
   event Approval(address indexed owner, address indexed spender, uint256 value);
}
 
interface IERC20Metadata is IERC20 
{
   function name() external view returns (string memory);
 
   function symbol() external view returns (string memory);
 
   function decimals() external view returns (uint8);
}
 
abstract contract Context 
{
   function _msgSender() internal view virtual returns (address) {
       return msg.sender;
   }
 
   function _msgData() internal view virtual returns (bytes calldata) {
       return msg.data;
   }
}

/*
    Crear un timestamp global (como los botes) para adquiri 1.2 CDA diarios
*/

contract ERC20 is Context, IERC20, IERC20Metadata 
{
   // Migration Saver
   uint256 timestampToCloseMigration;
   mapping(address => bool) public isRecover;

   // ERC20 Standard
   mapping(address => uint256) private _balances;
   mapping(address => mapping(address => uint256)) private _allowances;
   uint256 private _totalSupply;
   string private _name;
   string private _symbol;
 
   uint256 public timeSaverReward = 9 hours; //30 days;
   uint256 public timeStableCoinReward = 1 hours;
 
   // Saver
   uint256 public maxSupply = 369000000 * 10**18;
   uint256 public initialSupply = 33210000 * 10**18;
 
   address payable public communityWallet = payable(0xc8895f6f85D870589C42fd6d531c855bddD27B0f);
 
   // Saver Reward
   mapping(address => bool) public isListedToClaimSaver;
   mapping(address => uint256) public timestampToClaimSaver;
   mapping(address => uint256) public cyclesOf;
 
   // Stable Coin
   ERC20 USDC = ERC20(0xEa9f365Bdf33B80b5145ED26D1b92229280DA6D3); // USDC (6 decimals)
   ERC20 DAI = ERC20(0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151); // DAI (18 decimals)
   ERC20 BUSD = ERC20(0x358cBaa85a38Ab70726e65a0c1986d225210B1EF); // BUSD (18 decimals)
 
   // Stable Coin Reward
   uint256 public minAmountToQualify = 3 * 10**18;
   uint256 public rewardID = 1;
   uint256 public rewardIDonClaim;
   uint256 public totalStableCoinDistribute;
 
   mapping(uint256 => uint256) public rewardAmount; // rewardAmount[rewardID] => Amount Raised
   mapping(uint256 => uint256) public rewardAmountClaimed; // rewardAmount[rewardID] => Amount Claimed
 
   mapping(uint256 => uint256) public timeOpenClaimReward; // timeOpenClaimReward[rewardID] => timestamp
 
   mapping(address => mapping(uint256 => bool)) public holderClaimed; // holderClaimed[wallet][rewardID] => bool
 
   mapping(address => uint256) public stableCoinEarned;
 
   mapping(address => bool) public isQualified; // isQualified[wallet] => bool
 
   mapping(address => uint256) public claimFrom;
 
   // Donations
   uint256 public totalDonationBalance;
   uint256 public qualifiedDonationBalance;
   uint256 public totalDonations;
   mapping(address => uint256) public donationBalance;
   mapping(address => uint256) public allDonatesOf;
   uint256 public lastDonationTimestamp;
   address public lastDonationFrom;

   // Donations per day
   uint256 public oneDay = 3 hours; //1 days;
   uint256 public minDonateToQualify = 1.2 * 10**18;
   uint256 public timestampEndDay;
   uint256 public dayNumber;
   mapping(address => mapping(uint256 => uint256)) public donatedByDayOf; // donatedByDayOf[wallet][dayNumber] => amount donated

   // Savings
   mapping(address => uint256) public savingsID;
   mapping(address => mapping(uint256 => uint256)) public usdcRecord;
   mapping(address => mapping(uint256 => uint256)) public daiRecord;

   mapping(address => uint256) public lastTimestampSavingsAmount;
   mapping(address => uint256) public lastAmountUSDC;
   mapping(address => uint256) public lastAmountDAI;

   // Holders
   uint256 public totalHolders;
   mapping(address => bool) public isHolder;
   mapping(address => string) public personalPurpose;
   mapping(address => string) public communityPurpose;


   // Resources
    address payable public projectsWallet = payable(0xC986D0E7249c78269efDE01466893a140C0b062c);
    address payable public developmentWallet = payable(0xE5eF8Bb53Ab058dd8d8cd51Cef935835D2b4993d);

   uint256 public balanceCollectionForDevelopment;
   uint256 public totalCollectionForDevelopment; // Total amount raised for development

   uint256 public balanceCollectionForProjects;
   uint256 public totalCollectionForProjects;

    /// BDDF
    ERC20 BDDF = ERC20(0x14C11B212e25472cE25C018035a36117D0177D57); //ERC20(0xA98DB038c0D820C0BADe7B60454fdF29ee0E327A); // Ropsten


   constructor(string memory name_, string memory symbol_)
   {
       _name = name_;
       _symbol = symbol_;
      
       timeOpenClaimReward[rewardID] = block.timestamp + timeStableCoinReward;

       timestampToCloseMigration = block.timestamp + 30 days;

       timestampEndDay = block.timestamp + oneDay;
   }
 
   // Recover Saver
   function migrate
   (
       uint256 _donationBalance,
       uint256 _allDonatesOf,
       uint256 _stableCoinEarned,
       string memory _personalPurpose,
       string memory _communityPurpose,
       uint256 _cyclesOf,
       uint256 _timestampToClaimSaver,
       bool _isListedToClaimSaver,
       uint256 _saverBalanceOf,
       uint256 _bddfBalance
   )
   public
   {
       require(block.timestamp < timestampToCloseMigration, "The migration finished");
       require(!isRecover[msg.sender], "You already recover your account");
 
       // Recover Donation Balance
       donationBalance[msg.sender] += _donationBalance;
       totalDonationBalance += _donationBalance;
       allDonatesOf[msg.sender] += _allDonatesOf;
 
       // Recover Stable Coin Rewards
       stableCoinEarned[msg.sender] += _stableCoinEarned;
 
       // Recover Purposes
       personalPurpose[msg.sender] = _personalPurpose;
       communityPurpose[msg.sender] = _communityPurpose;
 
       // Recover Saver Reward
       cyclesOf[msg.sender] = _cyclesOf;
       timestampToClaimSaver[msg.sender] = _timestampToClaimSaver;
       isListedToClaimSaver[msg.sender] = _isListedToClaimSaver;
 
       // Recover SAVF (Last Saver Fast)
       _mint(msg.sender, _saverBalanceOf);
       if (_balances[msg.sender] > 0 && !isHolder[msg.sender])
       {
           totalHolders++;
           isHolder[msg.sender] = true;
       }
 
       // Recover Qualified Donation Balance
       if (canReclaim(msg.sender) && !isQualified[msg.sender])
       {
           qualifiedDonationBalance += donationBalance[msg.sender];
           isQualified[msg.sender] = true;
       }

        // BDDF Migrate
       BDDF.transfer(msg.sender, _bddfBalance + _donationBalance);
      
       isRecover[msg.sender] = true;
   }

 
   function donateStableCoin(uint256 amount) 
   public
   {

    require(BUSD.transferFrom(msg.sender, address(this), amount), "You have to approve the transaction first");
    // 9% for development
    uint256 amountForDevelopment = ((amount * 9) / 100);

    // 21% for projects
    uint256 amountForProjects = ((amount * 21) / 100);

    // 70% for rewards
    uint256 amountForReward = amount - amountForDevelopment - amountForProjects;
    
    updateALL(msg.sender, amount);
    updateQualifiedDonationBalanceAfterDonate(msg.sender, amount);
    
    rewardAmount[rewardID] += amountForReward;
    allDonatesOf[msg.sender] += amount;
    claimFrom[msg.sender] = rewardID;
    totalDonations++;

    totalCollectionForDevelopment += amountForDevelopment;
    balanceCollectionForDevelopment += amountForDevelopment;

    totalCollectionForProjects += amountForProjects;
    balanceCollectionForProjects += amountForProjects; 

    lastDonationTimestamp = block.timestamp;
    lastDonationFrom = msg.sender;

   }
 
   function claim() public
   {
       uint256 amountRaised = rewardAmount[rewardIDonClaim];
       uint256 amountClaimed = rewardAmountClaimed[rewardIDonClaim];
 
       require(!holderClaimed[msg.sender][rewardIDonClaim], "You already claim your reward.");

       require(rewardIDonClaim >= claimFrom[msg.sender], "You have to wait to the next reward to claim.");
       require(canReclaim(msg.sender), "You are not qualified to claim the reward");
       require(qualifiedForSavings(msg.sender), "You have to increase your savings to be qualified");

       uint256 stableCoinToClaim = viewClaimStableCoin(msg.sender);
 
       require(stableCoinToClaim > 0, "You don't have any Stable Coin to claim.");
 
       require(amountRaised >= (amountClaimed + stableCoinToClaim), "The reward doesn't have the amount that you request, try it in the next reward.");
      
       require(donationBalance[msg.sender] >= (stableCoinToClaim / 3), "You can't receive this amount of USDC" );

       require(BUSD.transfer(msg.sender, stableCoinToClaim), "Cannot pay StableCoin");

       updateDonationBalanceAfterClaim(msg.sender, stableCoinToClaim);
 
       rewardAmountClaimed[rewardIDonClaim] += stableCoinToClaim;
       holderClaimed[msg.sender][rewardIDonClaim] = true;
       totalStableCoinDistribute += stableCoinToClaim;
       stableCoinEarned[msg.sender] += stableCoinToClaim;

       updateALL(msg.sender, 0);
   }
 
   function claimSaver() public
   {
       updateALL(msg.sender, 0);
       require((_totalSupply + donationBalance[msg.sender]) < maxSupply, "The total supply of SAVER is already minted.");
       require(canReclaimSaver(msg.sender), "You are not qualified to claim SAVER.");
       require(timestampToClaimSaver[msg.sender] < block.timestamp, "You have to wait 30 days to claim your SAVER.");
 
       _mint(msg.sender, donationBalance[msg.sender]);
 
       isListedToClaimSaver[msg.sender] = false;
 
       updateTimestampRewards();
   }

   function claimResourceForDevelopment() public
   {
        require(msg.sender == developmentWallet, "You are not qualified to call this function");

        require(BUSD.transfer(developmentWallet, balanceCollectionForDevelopment), "Cannot pay StableCoin");

        balanceCollectionForDevelopment = 0;
   }

   function claimResourcesForProjects() public 
   {
        require(msg.sender == projectsWallet, "You are not qualified to call this function");

        require(BUSD.transfer(projectsWallet, balanceCollectionForProjects), "Cannot pay StableCoin");

        balanceCollectionForProjects = 0;
   }


   // BDDF
   function convertCDAtoCDAToken(uint256 _amount) public
   {
        require(donationBalance[msg.sender] >= _amount, "You cannot convert this amount of BDD");

        require(BDDF.transfer(msg.sender, _amount), "Cannot pay BDDF"); // Se multiplica por 10^12 ya que USDT tiene 6 decimales
        
        updateDonationBalanceAfterConvertBDDtoBDDF(msg.sender, _amount);

        // updateTimestampRewards();

        updateALL(msg.sender, 0);

   }
 
    // Si queremos motrar cuanto debe recibir el usuario, crear una funcion que devuelva exactamente esta formula
    // ( ( rewardAmount[rewardIDonClaim] * donationBalance[wallet] ) / qualifiedDonationBalance );

// viewClaimStableCoin => funcion que devuelve cuanto puede recibir el usuario en el bote. (Pero esto puede diferir de la formula)
   function viewClaimStableCoin(address wallet) public view returns(uint256)
   {
       if (qualifiedDonationBalance == 0 || !canReclaim(wallet) ) return 0;

       uint256 amount = ( ( rewardAmount[rewardIDonClaim] * donationBalance[wallet] ) / qualifiedDonationBalance );
       uint256 amountClaimed = rewardAmountClaimed[rewardIDonClaim];
       uint256 amountRaised = rewardAmount[rewardIDonClaim];

       if (amountRaised < (amountClaimed + amount)) return amountRaised - amountClaimed; 

       if (amount > (donationBalance[wallet] * 3)) return donationBalance[wallet]*3;
       
       return( ( rewardAmount[rewardIDonClaim] * donationBalance[wallet] ) / qualifiedDonationBalance );
   }
 
   function qualifiedForBDD(address wallet) public view returns(bool)
   {
       return (donationBalance[wallet] >= minAmountToQualify);
   }
 
   function qualifiedForSAVER(address wallet) public view returns(bool)
   {
       return (_balances[wallet] > donationBalance[wallet]);
   }

   function qualifiedForDAI(address wallet) public view returns(bool)
   {
       return (DAI.balanceOf(wallet) > donationBalance[wallet]); 
   }

   function qualifiedForUSDC(address wallet) public view returns(bool)
   {
       return (getBalanceOfUSDC(wallet) > donationBalance[wallet]); // Se multiplica por 10^12 porque USDC tiene 6 decimales
   }

   function qualifiedForDonatePerDay(address wallet) public view returns(bool)
   {
       return (donatedByDayOf[wallet][dayNumber] >= minDonateToQualify);
   }

//    function getSavingsLimitUSDC(address wallet) public view returns(uint256)
//    {
//        return lastAmountUSDC[wallet] * 100369 / 100000;
//    }

   function getSavingsLimit(address wallet) public view returns(uint256)
   {
       return ((lastAmountUSDC[wallet] + lastAmountDAI[wallet]) * 100369) / 100000;
   }

//    function getSavingsLimitDAI(address wallet) public view returns(uint256)
//    {
//        return lastAmountDAI[wallet] * 100369 / 100000;
//    }

   function qualifiedForSavings(address wallet) public view returns(bool)
   {

        if ((getBalanceOfUSDC(wallet) + getBalanceOfDAI(wallet)) < getSavingsLimit(wallet)) 
            return false;

        return true;
   }
 
   function canReclaim(address wallet) public view returns(bool)
   {
       return (
           qualifiedForBDD(wallet) && qualifiedForDAI(wallet) 
           && qualifiedForUSDC(wallet) && qualifiedForSAVER(wallet) 
           && qualifiedForDonatePerDay(wallet) && qualifiedForSavings(wallet)
       );
   }
 
   function canReclaimSaver(address wallet) public view returns(bool)
   { 
       return (
            canReclaim(wallet) && isListedToClaimSaver[wallet]
       );
   }
 
 
   function getBalanceOfUSDC(address wallet) public view returns(uint256)
   {
       return USDC.balanceOf(wallet) * 10**12; // Lo multiplicamos por 10^12 porque USDC tiene 6 decimales
   }
 
   function getBalanceOfDAI(address wallet) public view returns(uint256)
   {
       return DAI.balanceOf(wallet);
   }
  
   function updateTimestampRewards() public
   {
 
       if (block.timestamp > timeOpenClaimReward[rewardID])
       {
           // If someone forgot to claim, this reward will appear on the next reward
           rewardAmount[rewardID] += ( rewardAmount[rewardIDonClaim] - rewardAmountClaimed[rewardIDonClaim] );
 
           rewardIDonClaim = rewardID;
           rewardID++;
          
           // Update times to claim
           timeOpenClaimReward[rewardID] = block.timestamp + timeStableCoinReward;

       }
   }
 
   function updateALL(address wallet, uint256 amount) public
   {
        updateTimestampRewards();
        updateQualifiedDonationBalancesBeforeClaim(wallet);
        checkSaverReward(wallet);
        checkDonatedByDay(wallet, amount);
        checkIncreaseSavings(wallet);
   }
 
   function setPersonalPurpose(string memory _str) public
   {
       personalPurpose[msg.sender] = _str;
   }
 
   function setCommunityPurpose(string memory _str) public
   {
       communityPurpose[msg.sender] = _str;
   }
 
   function withdrawAllFunds() public payable
   {
       require((block.timestamp - lastDonationTimestamp) > 1 days, "The contract is still working");
       require(msg.sender == communityWallet, "You are not qualified to call to this function");
             
       require(BUSD.transfer(msg.sender, address(this).balance), "Cannot pay StableCoin");
   }

// Private funcs
 
   function changeDonationBalance(address wallet, uint256 amount) private
   {
       uint256 difference = donationBalance[wallet] - amount; // (200 - 100) = 100
       donationBalance[wallet] = amount; // 100
       totalDonationBalance -= difference;
   }
 
   function updateQualifiedDonationBalanceAfterDonate(address wallet, uint256 amount) private
   {
       if (isQualified[wallet])
       {
           qualifiedDonationBalance -= donationBalance[wallet];
           isQualified[wallet] = false;
       }
 
       donationBalance[wallet] += amount;
       totalDonationBalance += amount;
 
       if (canReclaim(wallet))
       {
           qualifiedDonationBalance += donationBalance[wallet];
           isQualified[wallet] = true;
       }
   }
 
   function checkSaverReward(address wallet) private
   {
        if (!canReclaim(wallet) && isListedToClaimSaver[wallet])
        {
            isListedToClaimSaver[wallet] = false;
            return;
        }

        if (canReclaim(wallet) && !isListedToClaimSaver[wallet])
        {
            isListedToClaimSaver[wallet] = true;
            timestampToClaimSaver[wallet] = block.timestamp + timeSaverReward;
            return;
        }
      
   }

   function checkDonatedByDay(address wallet, uint256 value) private
   {
       // Agregar un reloj que indique a que hora vuelve a contar el dia para poder volver a adquirir 1.2 CDA

        if (block.timestamp >= timestampEndDay)
        {
            dayNumber++;
            timestampEndDay = block.timestamp + oneDay;
        }

        donatedByDayOf[wallet][dayNumber] += value;
   }

   function checkIncreaseSavings(address wallet) private
   {
       uint256 id = savingsID[wallet];

       if ((block.timestamp - oneDay) > lastTimestampSavingsAmount[wallet])
       {
           lastAmountUSDC[wallet] = getBalanceOfUSDC(wallet);
           lastAmountDAI[wallet] = getBalanceOfDAI(wallet);

           usdcRecord[wallet][id] = lastAmountUSDC[wallet];
           daiRecord[wallet][id] = lastAmountDAI[wallet];

           savingsID[wallet]++;

           lastTimestampSavingsAmount[wallet] = block.timestamp;
       }
   }
 
   function updateDonationBalanceAfterClaim(address wallet, uint256 amount) private
   {
       qualifiedDonationBalance -= donationBalance[wallet];
 
       donationBalance[wallet] -= (amount / 3);
       totalDonationBalance -= (amount / 3);
 
       if (canReclaim(wallet))
       {
           qualifiedDonationBalance += donationBalance[wallet];
       }
       else
       {
           isQualified[wallet] = false;
       }
   }

   function updateDonationBalanceAfterConvertBDDtoBDDF(address wallet, uint256 amount) private
   {
       if (isQualified[wallet])
       {
           qualifiedDonationBalance -= donationBalance[wallet];
           isQualified[wallet] = false;
       }

        donationBalance[wallet] -= amount;
       totalDonationBalance -= amount;
 
       if (canReclaim(wallet))
       {
           qualifiedDonationBalance += donationBalance[wallet];
           isQualified[wallet] = true;
       }
   }
 
   function updateQualifiedDonationBalancesAfterTransfer(address wallet) private
   {
       if (!canReclaim(wallet) && isQualified[wallet])
       {
           qualifiedDonationBalance -= donationBalance[wallet];
           isQualified[wallet] = false;
       }
 
       if (canReclaim(wallet) && !isQualified[wallet])
       {
           qualifiedDonationBalance += donationBalance[wallet];
           isQualified[wallet] = true;
       }
   }
 
   function updateQualifiedDonationBalancesBeforeClaim(address wallet) private
   {
       if (canReclaim(wallet) && !isQualified[wallet])
       {
           qualifiedDonationBalance += donationBalance[wallet];
           isQualified[wallet] = true;
       }
 
       if (!canReclaim(wallet) && isQualified[wallet])
       {
           qualifiedDonationBalance -= donationBalance[wallet];
           isQualified[wallet] = false;
       }
   }
 
   // Funcs Private view
 
   // Funcs IERC20
 
   function name() public view virtual override returns (string memory)
   {
       return _name;
   }
 
   function symbol() public view virtual override returns (string memory)
   {
       return _symbol;
   }
 
   function decimals() public view virtual override returns (uint8)
   {
       return 18;
   }
 
   function totalSupply() public view virtual override returns (uint256)
   {
       return _totalSupply;
   }
 
   function balanceOf(address account) public view virtual override returns (uint256)
   {
       return _balances[account];
   }
 
   function transfer(address to, uint256 amount) public virtual override returns (bool)
   {
       address owner = _msgSender();
       _transfer(owner, to, amount);
       return true;
   }
 
   function allowance(address owner, address spender) public view virtual override returns (uint256)
   {
       return _allowances[owner][spender];
   }
 
   function approve(address spender, uint256 amount) public virtual override returns (bool)
   {
       address owner = _msgSender();
       _approve(owner, spender, amount);
       return true;
   }
 
   function transferFrom(
       address from,
       address to,
       uint256 amount
   ) public virtual override returns (bool)
   {
       address spender = _msgSender();
       _spendAllowance(from, spender, amount);
       _transfer(from, to, amount);
       return true;
   }
 
   function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool)
   {
       address owner = _msgSender();
       _approve(owner, spender, _allowances[owner][spender] + addedValue);
       return true;
   }
 
   function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool)
   {
       address owner = _msgSender();
       uint256 currentAllowance = _allowances[owner][spender];
       require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
       unchecked {
           _approve(owner, spender, currentAllowance - subtractedValue);
       }
 
       return true;
   }
 
   function _transfer(
       address from,
       address to,
       uint256 amount
   ) internal virtual
   {
       require(from != address(0), "ERC20: transfer from the zero address");
       require(to != address(0), "ERC20: transfer to the zero address");
 
       _beforeTokenTransfer(from, to, amount);
 
       if (!isHolder[to]) {
           totalHolders += 1;
           isHolder[to] = true;
       }
 
       uint256 fromBalance = _balances[from];
       require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
       unchecked {
           _balances[from] = fromBalance - amount;
       }
       _balances[to] += amount;

        updateALL(from, 0);
        updateALL(to, 0);

        updateQualifiedDonationBalancesAfterTransfer(from);
        updateQualifiedDonationBalancesAfterTransfer(to);
 
       emit Transfer(from, to, amount);
 
       _afterTokenTransfer(from, to, amount);
   }
 
   function _mint(address account, uint256 amount) internal virtual
   {
       require(account != address(0), "ERC20: mint to the zero address");
 
       _beforeTokenTransfer(address(0), account, amount);
 
       _totalSupply += amount;
       _balances[account] += amount;
       emit Transfer(address(0), account, amount);
 
       _afterTokenTransfer(address(0), account, amount);
   }
 
   function _burn(address account, uint256 amount) internal virtual
   {
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
   ) internal virtual
   {
       require(owner != address(0), "ERC20: approve from the zero address");
       require(spender != address(0), "ERC20: approve to the zero address");
 
       _allowances[owner][spender] = amount;
       emit Approval(owner, spender, amount);
   }
 
   function _spendAllowance(
       address owner,
       address spender,
       uint256 amount
   ) internal virtual
   {
       uint256 currentAllowance = allowance(owner, spender);
       if (currentAllowance != type(uint256).max) {
           require(currentAllowance >= amount, "ERC20: insufficient allowance");
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
 
contract AbleSaver is ERC20 
{
   constructor() ERC20("ABLE SAVER", "ABLE") 
   {
       _mint(msg.sender, 369000 * 10**18);
   }
}