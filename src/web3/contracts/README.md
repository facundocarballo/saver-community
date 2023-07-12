1- Desplegamos el contrato de Owner.

2- Desplegamos el contrato de Clock. (Necesita Able y Sinergy)
    - Seteamos contrato de Owner.
    - Revisar tiempo de ciclo.

3- Desplegamos el contrato de User. (Necesita Able, Test, SinergySale, 6 botes, Sinergy)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Clock.
    - Revisar USDC
    - Revisar USDT

4- Desplegamos el contrato de Test. (No necesita ningun contrato)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Clock.
    - Seteamos el contrato de User.

5- Desplegamos el contrato de Able. (Necesita SinergySale, Base Reward y los 2 botes de Confidence)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Clock.
    - Seteamos el contrato de User.

6- Desplegamos el contrato de Sienrgy. (Necesita Migracion, SinergySale, 6 botes)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Clock.
    - Seteamos el contrato de User.
    - Seteamos el contrato de Able.
    - Revisamos la Stablecoin.
    - Revisamos la cantidad de NFTs que hay.

7- Desplegamos el contrato de Sinergy Sale. (Necesita Base Reward (Able Daily Reward))
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Clock.
    - Seteamos el contrato de User.
    - Seteamos el contrato de Sinergy.

8- Desplegamos el contrato de Migracion (Sinergy). (No necesita ningun contrato)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Sinergy.
    - Seteamos el contrato de Able.

9- Desplegamos el contrato de BaseReward (No necesita ningun contrato)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Clock.
    - Seteamos el contrato de User.
    - Seteamos el contrato de Able.
    - Revisamos la Stablecoin (Token)

10- Desplegamos el contrato de ValueReward (No necesita ningun contrato)
    - Seteamos el contrato de Sinergy
    - Seteamos el contrato de AbleSale

11- Desplegamos el contrato de ConstancyReward (No necesita ningun contrato)
    - Seteamos el contrato de Sinergy
    - Seteamos el contrato de AbleSale

12- Desplegamos el contrato de ConfidenceReward (No necesita ningun contrato)
    - Seteamos el contrato de Sinergy
    - Seteamos el contrato de AbleSale

13- Desplegamos el contrato de Migracion (Sinergy Sale) (No necesita ningun contrato)
    - Seteamos contrato de Owner.
    - Seteamos el contrato de Sinergy Sale

------------------------------------------------

1- Revisamos los contratos que necesita Clock.
2- Revisamos los contratos que necesita User.
3- Revisamos los contratos que necesita Able.
4- Revisamos los contratos que necesita Sienrgy.
5- Revisamos los contratos que necesita Test.
6- Revisamos los contratos que necesita Sinergy Sale.
7- Revisamos los contratos que necesita Migracion.
8- Revisamos los contratos que necesita BaseReward.
9- Revisamos los contratos que necesita PassiveReward.
10- Revisamos los contratos que necesita ConstancyReward.

Empecamos con 10.98 GLMR

// Clock 0xbc4E59AE11A28214f84FCc1c9B0535355D408BBf
// User 0xb48E4bbE89bD0276343726b0f8A162be1BCB411c
// Able 0xc62D16e508163cE73Cbc4c8A6dD23293A5966c1E
// Sinergy 0x7087254bC21D5CA5c26089cA787CAD728ea62C83
// Test 0x0fD26833Bb122baf3b5982D4E68BAaBb16980791
// Sinergy Sale 0x258eC126779278Ff594a78E856B2aA5Ae8BC16aE
// Migration 0x935e0FBaEdA443928062Bbadf4F101357Ff16765
// Base Reward 0x1Ef4ee71e66ED79C2a421926D27c2F88b375D886
// Value Reward Stablecoin 0xbEE331fF26942D8556d3EE07Fe611Dd4086b5260
// Value Reward Able 0x03B1a450ecE6a8443bf6B48370918e432ad438D0
// Constancy Reward Stablecoin 0x24D530cECA4C555f3a8A97AB7674A365a2FcccD0
// Constancy Reward Able 0x389695704135FAaFDbe75bFa65FCf95e1bC1234a
// Confidence Reward Stablecoin 0xb9b98612D1C652b9ca54B2d68ce5EAfFF692e24F
// Confidence Reward Able 0x7bCcdDF229BA8EC6F53a97a9834F97bF2C94DBB4
// Migration Sale 0x43FA02B1cF2B70922D8Bc7ABd76330B2FF54b260

Observaciones:
El contrato del Test puede ir 4. (Solo necesita Clock y User)

Terminamos con 4.64 GLMR



------------------------------------
1. Desplegamos el contrato de Addresses. 0xfd5cc7c77B45B2C0DA2E4FB37615ac0D948fbD51
2. Seteamos el contrato de Addresses en Router.
3. Desplegamos todos los contratos (en cualquier orden).
4. Seteamos las direcciones de los contratos desplegados en el contrato de Addresses.
5. Llamar a la funcion RefreshAll de Addresses.
6. Migramos Able (antes de actualizar la dapp)
