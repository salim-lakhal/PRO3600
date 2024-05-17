import { Client, Wallet, convertHexToString } from 'xrpl';

const standbySeedValue = "sEdTJwTTNmCH23Su1zwBHFYJT9Khswa";
const net = 'wss://s.altnet.rippletest.net:51233/';

async function getTokens(standbySeedValue, net) {
    const standby_wallet = Wallet.fromSeed("sEdTJwTTNmCH23Su1zwBHFYJT9Khswa");
    const client = new Client('wss://s.altnet.rippletest.net:51233/');
    
    let results = 'Connecting to ' + net + '...';
    let nftArray = []; // Tableau pour stocker les NFTs
    
    try {
        await client.connect();
        results += '\nConnected. Getting NFTs...';

        // Request a list of NFTs owned by the account
        const response = await client.request({
            method: "account_nfts",
            account: "rNpvQzFhJtpePqVpNN3c68G67CY3pefkPK",
        });

        const nfts = response.result.account_nfts;
        
        // Utilise un Set pour stocker les URI uniques
        const uriSet = new Set();

        // Utilise une boucle for...of pour itérer sur chaque NFT et ajouter l'URI au Set
        for (const nft of nfts) {
            uriSet.add(nft.URI);
        }

        // Transform uriSet into an array of objects with name and link fields
        const uriArray = Array.from(uriSet);
        for (let i = 0; i < uriArray.length; i++) {
            const link = `https://ipfs.io/ipfs/${convertHexToString(uriArray[i])}`;
            const name = `file${i}`;
            nftArray.push({ name, link });
        }

        results += '\nNFTs:\n ' + JSON.stringify(nfts, null, 2);

        return { nftArray, results };

    } catch (error) {
        console.error("Error getting NFTs:", error);
        results += '\nError getting NFTs: ' + error.message;
        return { nftArray: [], results };
    } finally {
        client.disconnect();
    }
}

const nftArray = await getTokens(standbySeedValue, net);

export { getTokens };
