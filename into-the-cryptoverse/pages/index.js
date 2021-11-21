import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3Client } from '../lib/web3Client.ts'
import { useEffect, useState } from 'react'
import TableComponent from '../components/common/navbar/Table'


const web3Client = new Web3Client();



const collectionModel = {
  total : Number,
  name : String,
  description : String,
  symbol : String,
  owners: [],
  thumbnail : String,
  animation_url: String,
  external_link: String,
  token_address: String,
  token_id: String,
}


export default function Home() {
  const contractAddress = '0x495f947276749ce646f68ac8c248420045cb7b5e';
  const token_id = '85797252838490455913575901811142501181290684799210155318723712080594570576872';
  const collectionSlug = 'into-the-cryptoverse-nfts';
  const [collection,setCollection] = useState([]);
  const [tableState,setTableState] = useState([]);
  let count = 1;
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function getOpenSeaCollection(){
      await web3Client.getOpenSeaCollectionWithOwners(contractAddress,collectionSlug)
      .then((data) => {
        console.log('Open data',data)
      setCollection(JSON.parse(JSON.stringify(data)));

      });
      // const data = await  getContractNFTs('0x9307edc4f23d87f9783a999f870b728ab9d34fe5',500);
    }
    getOpenSeaCollection()

    
  },[]);



  useEffect(()=>{
          
      if(collection.length !== 0){
        console.log('Hello world',collection)
        setTableState(JSON.parse(JSON.stringify(collection)));
      }

  },[collection])


  useEffect(()=>{
    if(tableState.length !== 0){
      setLoading(!loading)
    }
  },[tableState])

  return (
    <div className="">
      {!loading ? <TableComponent tableState={tableState}/> : <h1 className=" text-center p-5">Loading...</h1>}
    </div>
  )

  async function getContractNFTs(contractAddress,offset){
    return await web3Client.getContractAdressNFTs(contractAddress,offset);
  }

  function createNewCollection(data){
    const nft = data.result[0];
    const nftMetadata = getMetadata(nft);
    const collection = collectionModel;
    collection.symbol = nft.symbol;
    collection.token_address = nft.token_address;
    collection.token_id = nft.token_id;
    collection.description = nftMetadata.description;
    collection.external_link = nftMetadata.external_link;
    collection.thumbnail = nftMetadata.image;
    collection.name = nftMetadata.name;
    collection.animation_url = nftMetadata.animation_url;
    const owners = getOwners(data.result);
    collection.owners = owners.accounts;
    collection.total  = owners.total;
    return collection;
  }

  function getMetadata(item){
    return JSON.parse(item.metadata)
  }
}


  // function addTokenIds(data,name){
  //   data.map((item) => {
  //     const metadata = item.metadata;
  //     if(metadata.name === name){
  //       tokenIds.push(item.token_id);
  //     }
  //     items++;
  //   })
    
  //   return tokenIds;
  // }

