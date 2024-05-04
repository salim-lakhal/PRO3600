async function getTokens() {

    const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value);
    let net = getNet();
    const client = new xrpl.Client(net);
    let results = 'Connecting to ' + net + '...';
    standbyResultField.value = results;
    await client.connect();
    results += '\nConnected. Getting NFTs...';
    standbyResultField.value = results;

    const nfts = await client.request({
        method: "account_nfts",
        account: standby_wallet.classicAddress
    });

    const selectedNFT = nfts[0];

    const selectedNFTURI = selectedNFT.uri;

    results += '\nURI du NFT sélectionné: ' + selectedNFTURI;
    standbyResultField.value = results;

    client.disconnect();
}