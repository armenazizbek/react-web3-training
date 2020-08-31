import React, {useEffect, useState} from 'react';
import { Table } from 'antd';
import firebase from "firebase";
import 'antd/dist/antd.css';
import './App.css';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const config = {
    apiKey: "AIzaSyB0sQyZ4Jo7PO13Y6ahIBiNche8xyMBHEw\n",
    authDomain: "web3-e03c0.firebaseapp.com",
    databaseURL: "https://web3-e03c0.firebaseio.com/",
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }, [config]);

  useEffect(() => {
    setLoading(true);
    firebase.database().ref('events').limitToLast(30).on('value', (snap) => {
      setData(Object.values(snap.val()));
      setLoading(false);
    })
  }, []);

  const columns = [
    {
      title: 'transactionHash',
      dataIndex: 'transactionHash',
      id: (text) => {
        return text
      }
    },{
      title: 'blockNumber',
      dataIndex: 'blockNumber',
      sorter: (a, b) => Number(a.blockNumber) - Number(b.blockNumber),
      defaultSortOrder: 'descend',
      id: (text) => {
        return text
      }
    },{
      title: 'destination',
      render: (text, record) => {
        return record.returnValues.dst;
      },
      id: (text) => {
        return text
      }
    },{
      title: 'source',
      render: (text, record) => {
        return record.returnValues.src;
      },
      id: (text) => {
        return text
      }
    },{
      title: 'wad',
      render: (text, record) => {
        return record.returnValues.wad;
      },
      id: (text) => {
        return text
      }
    },
  ];

  return (
    <div className="App">
      <Table dataSource={data} columns={columns} pagination={false} rowKey="id" loading={loading}/>
    </div>
  );
};

export default App;
