import fetch from 'isomorphic-unfetch'


export class Web3Client{

  web3Client = fetch;

  constructor(){

  }

      // const data = await  getContractNFTs('0x9307edc4f23d87f9783a999f870b728ab9d34fe5',500);

  async getNFTOwnersByContractAdrressAndTokenID(contractAddress,tokenId,offset?) {
    const _offset = offset ? `offset=${offset}` :  ``;
    const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${tokenId}/owners?${_offset}`
    const req = {
        method: 'GET',
        headers: {'Content-type':'application/json', 
                    'x-api-key' : 'yWejnES29da4JA0vkFrM8z7hRtdPNUsT0YOpojKqskyO7APCokkXTYqK3kNYdCsN'},
    }

    return this.web3Client(url,req).then((res) => {
        const response = res.ok && res.status !== 204 ? res.json() : res.body;
        return response;
    })
  }

  async getContractAdressNFTs(contractAddress,offset?){
    const _offset = offset ? `&offset=${offset}` :  ``;
    const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}?chain=eth${_offset}`
    const req = {
        method: 'GET',
        headers: {'Content-type':'application/json', 
                    'x-api-key' : 'yWejnES29da4JA0vkFrM8z7hRtdPNUsT0YOpojKqskyO7APCokkXTYqK3kNYdCsN'},
    }

    return this.web3Client(url,req).then((res) => {
        const response = res.ok && res.status !== 204 ? res.json() : res.body;
        return response;
    })
  }

  async getOpenSeaCollection(contractAddress,collectionSlug){
    const url = `https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&order_direction=desc&offset=0&limit=50&collection=${collectionSlug}`;
    return await this.web3Client(url).then((res) => {
      const response = res.ok && res.status !== 204 ? res.json() : res.body;
      return response;
    })
  }

  async getOpenSeaCollectionWithOwners(contractAddress,collectionSlug){
    const data  = await this.getOpenSeaCollection(contractAddress,collectionSlug);
    const assets = this.makeAssets(data);
    
    console.log('Client data',data);
    return await this.getAssetOwners(contractAddress, assets);
  }

  async getAssetOwners(contractAddress,assets){
    const _assets = JSON.parse(JSON.stringify(assets));
    const results = [];
  
    for (let asset of _assets){
      const owners = await this.getOwners(contractAddress,asset);
      asset['owners']= owners;
      results.push(asset)
    }

    // console.log('Assets',results)
    return await JSON.parse(JSON.stringify(_assets))
  }

  async getOwners(contractAddress,asset){
    const data = await this.getNFTOwnersByContractAdrressAndTokenID(
      contractAddress,asset.token_id);
      
    const owners = [];  
    let totalNFTs = 0;
    data?.result.map((item) => {
            const owner = {
              owner_of : item.owner_of,
              amount : item.amount
            }
            owners.push(owner);
            totalNFTs = totalNFTs +  JSON.parse(owner.amount);
        })
    return { accounts : owners, total : totalNFTs};
  }

  makeAssets(data){
    let _collection = [];
    const assets = data.assets;
    assets.map((item)=>{
      const asset = {
        name: item.name,
        description : item.description,
        num_sales : item.num_sales,
        token_id : item.token_id,
        traits : item.traits,
        thumbnail: item.image_url,
        animation_url : item.animation_url,
        external_link : item.external_link,
        opensea_link : item.permalink,
        last_sale : this.getLastSale(item.last_sale),
      }
      _collection.push(asset);
    });
    return JSON.parse(JSON.stringify(_collection));
  }

  getLastSale(last_sale){
    const {total_price,quantity,payment_token} = last_sale;
    const {symbol,image_url,usd_price, eth_price, decimals} = payment_token;

    const total = (total_price * Math.pow(10,(-1*decimals)) * eth_price) / quantity;
    const usd = Number(total * usd_price).toFixed(2)
    return { total, symbol,image_url,usd};
  }

  getDefaultHeaders(headers){
      return headers['x-api-key'] = "yWejnES29da4JA0vkFrM8z7hRtdPNUsT0YOpojKqskyO7APCokkXTYqK3kNYdCsN"
  }

  getMetadata(item){
    return JSON.parse(item.metadata)
  }

    // addTokenIds(data,name){
  //   data.map((item) => {
  //     const metadata = item.metadata;
  //     if(metadata.name === name){
  //       tokenIds.push(item.token_id);
  //     }
  //     items++;
  //   })
    
  //   return tokenIds;
  // }

}