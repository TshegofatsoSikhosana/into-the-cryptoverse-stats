import { Web3Client } from '../lib/web3Client.ts'
import { useEffect, useState } from 'react'
import TableComponent from '../components/common/navbar/Table'


const web3Client = new Web3Client();

export default function Home() {
  const contractAddress = '0x495f947276749ce646f68ac8c248420045cb7b5e';
  const collectionSlug = 'into-the-cryptoverse-nfts';
  const [collection,setCollection] = useState([]);
  const [tableState,setTableState] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function getOpenSeaCollection(){
      await web3Client.getOpenSeaCollectionWithOwners(contractAddress,collectionSlug)
      .then((data) => {
        // console.log('Open data',data)
        setCollection(JSON.parse(JSON.stringify(data)));
      });
    }
    getOpenSeaCollection()    
  },[]);

  useEffect(()=>{      
      if(collection.length !== 0){
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
}