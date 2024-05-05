import xrpl from 'xrpl';

const flagsValue = 123; // Valeur pour le champ "Flags"
const transferFeeValue = 1; // Valeur pour le champ "TransferFee"

const walletInfo = {
    address: 'rn1N49T6wKUQ2FXwq41nueCX1mu45TpguK',
    secret: 'sEdTRqiBRVduV3uT5crayuLKGKrzHJe',
    balance: '100 XRP',
    sequenceNumber: 418608,
};

async function mintNFTWithCID(cid) {
    // Initialisez et configurez votre client XRPL
    const client = new xrpl.Client("wss://s.devnet.rippletest.net:51233");
    await client.connect();

    // Définissez la transaction.
    const transactionJson = {
        "TransactionType": "NFTokenMint",
        "Account": walletInfo.address, // Utilisez l'adresse du portefeuille connecté
        "URI": xrpl.convertStringToHex(cid), // Utilisez le CID passé comme paramètre
        "Flags": flagsValue,
        "TransferFee": transferFeeValue,
        "NFTokenTaxon": 0 // Required, but if you have no use for it, set to zero.
    };

    try {
        // Envoyez la transaction et attendez la réponse.
        const tx = await client.submitAndWait(transactionJson, { wallet: walletInfo });

        // Demandez une liste de NFTs détenus par le compte.
        const nfts = await client.request({
            method: "account_nfts",
            account: walletInfo.address
        });
    } finally {
        // Déconnectez le client après avoir terminé les opérations.
        client.disconnect();
    }
}

export { mintNFTWithCID };




/*
// Définissez la fonction mintNFTWithCID
async function mintNFTWithCID(cid) {
    // Connectez-vous au ledger et obtenez le portefeuille de compte connecté.
    let net = getNet();
    const standby_wallet = getCurrentConnectedWallet(); // Utilisez une fonction pour obtenir le portefeuille connecté
    const client = new xrpl.Client(net);
    await client.connect();

    // Définissez la transaction.
    const transactionJson = {
        "TransactionType": "NFTokenMint",
        "Account": standby_wallet.address, // Utilisez l'adresse du portefeuille connecté
        "URI": xrpl.convertStringToHex(cid), // Utilisez le CID passé comme paramètre
        "Flags": parseInt(standbyFlagsField.value),
        "TransferFee": parseInt(standbyTransferFeeField.value),
        "NFTokenTaxon": 0 // Required, but if you have no use for it, set to zero.
    };

    // Envoyez la transaction et attendez la réponse.
    const tx = await client.submitAndWait(transactionJson, { wallet: standby_wallet });

    // Demandez une liste de NFTs détenus par le compte.
    const nfts = await client.request({
        method: "account_nfts",
        account: standby_wallet.address
    });

    // Rapportez les résultats.
    let results = 'Transaction result: ' + tx.result.meta.TransactionResult;
    results += '\nnfts: ' + JSON.stringify(nfts, null, 2);
    standbyBalanceField.value = (await client.getXrpBalance(standby_wallet.address));
    standbyResultField.value = results;
}

export { mintNFTWithCID };*/
