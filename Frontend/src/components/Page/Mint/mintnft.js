import { Client, Wallet, convertStringToHex } from 'xrpl';

const client = new Client("wss://s.altnet.rippletest.net:51233/");


// Création du wallet avec les données fournies
const wallet = Wallet.fromSeed('sEdTJwTTNmCH23Su1zwBHFYJT9Khswa');

async function getLastValidatedLedgerSequence() {
    const serverState = await client.request({ method: "server_state" });
    const ledgerSequence = serverState.result.state.validated_ledger.seq;
    return ledgerSequence;
}

async function performNFTOperation(cid, transactionType, flagsValue, transferFeeValue, wallet) {
    await client.connect();

    const lastValidatedLedger = await getLastValidatedLedgerSequence();
    const lastLedgerSequence = lastValidatedLedger + 4;

    console.log("CID avant conversion:", cid);
    const hexUri = convertStringToHex(cid);
    console.log("URI hexadécimal après conversion:", hexUri);
    
    if (!hexUri) {
        throw new Error("L'URI converti en hexadécimal est vide.");
    }

    const transactionJson = {
        "TransactionType": transactionType,
        "Account": "rNpvQzFhJtpePqVpNN3c68G67CY3pefkPK", // Utilisation de la classic address fournie
        "URI": hexUri,
        "Flags": 8, /* 2147483648, // Utilisation de tfFullyCanonicalSig */
        "TransferFee": transferFeeValue,
        "NFTokenTaxon": 0,
        "LastLedgerSequence": lastLedgerSequence


    };

    try {
        const tx = await client.submitAndWait(transactionJson, { wallet });
        const nfts = await client.request({
            method: "account_nfts",
            account: "rNpvQzFhJtpePqVpNN3c68G67CY3pefkPK" // Utilisation de la classic address fournie
        });
        return { tx, nfts };
    } finally {
        client.disconnect();
    }
}

async function mintNFTWithCID(cid, wallet) {
    if (!cid) {
        throw new Error("CID est vide.");
    }

    const { tx, nfts } = await performNFTOperation(cid, "NFTokenMint", 123, 1, wallet);
    return { tx, nfts };
}



export { mintNFTWithCID, wallet };




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
