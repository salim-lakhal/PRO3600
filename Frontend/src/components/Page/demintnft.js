async function getTokens() {
    
    const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value);
    const net = getNet();
    const client = new xrpl.Client(net);
    let results = 'Connecting to ' + net + '...';
    standbyResultField.value = results;
    
    try {
        await client.connect();
        results += '\nConnected. Getting NFTs...';
        standbyResultField.value = results;

        const nfts = await client.request({
            method: "account_nfts",
            account: standby_wallet.classicAddress
        });
        
        const uris = nfts.map(getNFTuri);
        return uris;

    } catch (error) {
        console.error("Error getting NFTs:", error);
        return [];
    } finally {
        client.disconnect();
    }
}

async function getNFTuri(nft) {
    return convertHexToString(nft.uri);
}
