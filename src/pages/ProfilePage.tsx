import React, { useState } from 'react'
import { User, MapPin, Package, Settings } from 'lucide-react'

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile')

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '32px',
        textTransform: 'uppercase'
      }}>
        MY PROFILE
      </h1>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <TabButton
          icon={<User size={18} />}
          label="PROFILE"
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        />
        <TabButton
          icon={<MapPin size={18} />}
          label="ADDRESSES"
          active={activeTab === 'addresses'}
          onClick={() => setActiveTab('addresses')}
        />
        <TabButton
          icon={<Package size={18} />}
          label="ORDERS"
          active={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
        />
      </div>

      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'addresses' && <AddressesTab />}
      {activeTab === 'orders' && <OrdersTab />}
    </div>
  )
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        backgroundColor: active ? 'var(--pink)' : 'var(--white)',
        border: '3px solid var(--black)',
        color: active ? 'var(--white)' : 'var(--black)',
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      className="neo-shadow-sm"
    >
      {icon}
      {label}
    </button>
  )
}

function ProfileTab() {
  return (
    <div style={{
      backgroundColor: 'var(--white)',
      border: '4px solid var(--black)',
      padding: '32px'
    }}
    className="neo-shadow-lg"
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          backgroundColor: 'var(--cyan)',
          border: '4px solid var(--black)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="neo-shadow"
        >
          <User size={48} />
        </div>
        <div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            WALLET USER
          </h2>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'monospace'
          }}>
            0x1234...5678
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        <StatBox label="TOTAL ORDERS" value="12" color="var(--cyan)" />
        <StatBox label="TOTAL SPENT" value="1,250 USDC" color="var(--yellow)" />
        <StatBox label="VOUCHERS OWNED" value="4" color="var(--green)" />
      </div>
    </div>
  )
}

function AddressesTab() {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          SAVED ADDRESSES
        </h2>
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'var(--pink)',
          border: '3px solid var(--black)',
          color: 'var(--white)',
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}
        className="neo-shadow"
        >
          ADD NEW
        </button>
      </div>

      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {[1, 2].map((i) => (
          <div key={i} style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px'
          }}
          className="neo-shadow"
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '12px'
            }}>
              <div style={{
                padding: '6px 12px',
                backgroundColor: i === 1 ? 'var(--yellow)' : 'var(--cyan)',
                border: '2px solid var(--black)',
                fontSize: '10px',
                fontWeight: 700
              }}>
                {i === 1 ? 'DEFAULT' : 'SECONDARY'}
              </div>
              <button style={{
                padding: '8px 16px',
                backgroundColor: 'var(--pink)',
                border: '3px solid var(--black)',
                color: 'var(--white)',
                fontSize: '12px',
                fontWeight: 700
              }}
              className="neo-shadow-sm"
              >
                EDIT
              </button>
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              JOHN DOE
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.6
            }}>
              123 BLOCKCHAIN STREET<br />
              CRYPTO CITY, CC 12345<br />
              UNITED STATES<br />
              +1 234 567 8900
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>
        ORDER HISTORY
      </h2>

      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px'
          }}
          className="neo-shadow"
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '4px',
                  textTransform: 'uppercase'
                }}>
                  ORDER #{1000 + i}
                </h3>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  PLACED ON: {new Date().toLocaleDateString()}
                </p>
              </div>
              <div style={{
                padding: '8px 16px',
                backgroundColor: i === 1 ? 'var(--green)' : i === 2 ? 'var(--yellow)' : 'var(--cyan)',
                border: '3px solid var(--black)',
                fontSize: '12px',
                fontWeight: 700
              }}
              className="neo-shadow-sm"
              >
                {i === 1 ? 'DELIVERED' : i === 2 ? 'IN TRANSIT' : 'PROCESSING'}
              </div>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--cyan)',
              border: '3px solid var(--black)',
              marginBottom: '12px'
            }}>
              <p style={{
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '4px'
              }}>
                WIRELESS HEADPHONES × 1
              </p>
              <p style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--pink)'
              }}>
                TOTAL: {45 + i * 10} USDC
              </p>
            </div>
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'var(--pink)',
              border: '3px solid var(--black)',
              color: 'var(--white)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
            className="neo-shadow-sm"
            >
              VIEW DETAILS
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: color,
      border: '3px solid var(--black)',
      textAlign: 'center'
    }}
    className="neo-shadow"
    >
      <div style={{
        fontSize: '12px',
        fontWeight: 700,
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: 700
      }}>
        {value}
      </div>
    </div>
  )
}

export default ProfilePage
