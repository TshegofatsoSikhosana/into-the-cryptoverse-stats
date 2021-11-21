// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Web3Client } from '../../../lib/web3Client.ts'
import fetch from 'isomorphic-unfetch'

const web3Client = new Web3Client();
const httpClient = fetch;
export default async function handler(req, res) {
  const {contractAddress, collectionSlug } = req.query;
  const data = getOpenSeaCollection(contractAddress,collectionSlug)
  console.log(req.query)
  res.status(200).json(data)
}


async function getOpenSeaCollection(contractAddress,collectionSlug){
  const url = `https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&order_direction=desc&offset=0&limit=50&collection=${collectionSlug}`;
  
  const data =  await httpClient(url).then((res) => {
    const response = res.ok && res.status !== 204 ? res.json() : res.body;
    return response;
  })

  console.log('Res:::',data)

  return data;
}

