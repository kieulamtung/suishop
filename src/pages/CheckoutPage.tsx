import React, { useState } from 'react'
import { Trash2, Ticket } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const discount = selectedVoucher ? subtotal * 0.3 : 0
  const total = subtotal + shipping - discount

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
        CHECKOUT
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr',
        gap: '32px'
      }}>
        <div>
          <div style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px',
            marginBottom: '24px'
          }}
          className="neo-shadow"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              CART ITEMS ({items.length})
            </h2>

            {items.length === 0 ? (
              <p style={{
                textAlign: 'center',
                padding: '40px',
                fontSize: '16px',
                fontWeight: 600
              }}>
                YOUR CART IS EMPTY
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: 'var(--cyan)',
                    border: '3px solid var(--black)'
                  }}
                  className="neo-shadow-sm"
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'var(--white)',
                      border: '2px solid var(--black)',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}>
                        {item.price} USDC × {item.quantity}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--white)',
                            border: '2px solid var(--black)',
                            fontWeight: 700
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--white)',
                            border: '2px solid var(--black)',
                            fontWeight: 700
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--pink)',
                        border: '3px solid var(--black)',
                        color: 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                      className="neo-shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{
            backgroundColor: 'var(--yellow)',
            border: '4px solid var(--black)',
            padding: '24px'
          }}
          className="neo-shadow"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Ticket size={24} />
              APPLY VOUCHER
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              <VoucherOption
                name="SUMMER 30%"
                selected={selectedVoucher === 'summer'}
                onClick={() => setSelectedVoucher(selectedVoucher === 'summer' ? null : 'summer')}
              />
              <VoucherOption
                name="TECH 40%"
                selected={selectedVoucher === 'tech'}
                onClick={() => setSelectedVoucher(selectedVoucher === 'tech' ? null : 'tech')}
              />
            </div>
          </div>
        </div>

        <div>
          <div style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px',
            position: 'sticky',
            top: '100px'
          }}
          className="neo-shadow-lg"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              ORDER SUMMARY
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <SummaryRow label="SUBTOTAL" value={`${subtotal.toFixed(2)} USDC`} />
              <SummaryRow label="SHIPPING" value={`${shipping.toFixed(2)} USDC`} />
              {discount > 0 && (
                <SummaryRow label="DISCOUNT" value={`-${discount.toFixed(2)} USDC`} color="var(--green)" />
              )}
              <div style={{
                height: '3px',
                backgroundColor: 'var(--black)',
                margin: '16px 0'
              }} />
              <SummaryRow label="TOTAL" value={`${total.toFixed(2)} USDC`} large />
            </div>

            <button
              disabled={items.length === 0}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: items.length === 0 ? '#ccc' : 'var(--pink)',
                border: '4px solid var(--black)',
                color: 'var(--white)',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: items.length === 0 ? 'not-allowed' : 'pointer'
              }}
              className="neo-shadow"
            >
              PAY WITH WALLET
            </button>

            <p style={{
              marginTop: '16px',
              fontSize: '12px',
              fontWeight: 600,
              textAlign: 'center'
            }}>
              PROTECTED BY ESCROW SMART CONTRACT
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, color, large }: { label: string; value: string; color?: string; large?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      fontSize: large ? '20px' : '16px',
      fontWeight: large ? 700 : 600,
      color: color || 'var(--black)'
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function VoucherOption({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px',
        backgroundColor: selected ? 'var(--pink)' : 'var(--white)',
        border: '3px solid var(--black)',
        color: selected ? 'var(--white)' : 'var(--black)',
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase'
      }}
      className="neo-shadow-sm"
    >
      {name}
    </button>
  )
}

export default CheckoutPage
