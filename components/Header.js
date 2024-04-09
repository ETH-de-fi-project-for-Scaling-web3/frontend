import Link from 'next/link';
import { ethers } from 'ethers';
import { Layout, Button, Modal, Space, Typography } from 'antd/lib';
import { useContext, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { WalletOutlined } from '@ant-design/icons/lib';
import { useRouter } from 'next/router';
import { WalletContext } from '@/context/WalletContext';

const { Header } = Layout;
const { Text } = Typography;

const WalletHeader = () => {
  const router = useRouter();
  const {
    selectedAddress,
    setSelectedAddress,
    balance,
    setBalance,
    connected,
    setConnected,
    visible,
    setVisible,
    connectWallet,
    disconnectWallet
  } = useContext(WalletContext);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        provider.on('chainChanged', handleChainChanged);
        provider.on('accountsChanged', handleAccountsChanged);
      }
    };
    init();

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [selectedAddress]);

  const handleChainChanged = (_chainId) => {
    window.location.reload();
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      setSelectedAddress(null);
      setBalance(null);
      setConnected(false);
    } else if (accounts[0] !== selectedAddress) {
      setSelectedAddress(accounts[0]);
      await updateBalance(accounts[0]);
      setConnected(true);
    }
  };

  async function updateBalance(account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  }

    return (
        <Header className='flex justify-end bg-transparent m-2'>
            {connected ? (
                <Space direction="horizontal" align="center">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', marginRight: '10px' }}>
                        <Text style={{ color: 'white', marginBottom: '5px' }}>
                            {selectedAddress.slice(0, 6) + "..." + selectedAddress.slice(-4)}
                        </Text>
                        <Text style={{ color: 'white' }}>
                            {balance.slice(0,5)} SHM
                        </Text>
                    </div>
                    <Button type="primary" shape="circle" icon={<WalletOutlined />} onClick={() => setVisible(true)} />
                </Space>
            ) : (
                <Button type="primary" onClick={connectWallet}>Connect Wallet</Button>
            )}
         
        </Header>
    );
    
}

export default WalletHeader;
