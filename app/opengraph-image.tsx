import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '쿠팡아웃 - 25명의 죽음, 3,370만 개인정보 유출'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(45deg, #f9fafb 25%, transparent 25%), linear-gradient(-45deg, #f9fafb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f9fafb 75%), linear-gradient(-45deg, transparent 75%, #f9fafb 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                        opacity: 0.5,
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        padding: '40px',
                        border: '4px solid #DC2626',
                        borderRadius: '24px',
                        background: 'white',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: '#DC2626',
                            marginBottom: 20,
                            letterSpacing: '-2px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        🚫 쿠팡아웃
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            color: '#1F2937',
                            fontWeight: 600,
                            marginBottom: 10,
                            textAlign: 'center',
                        }}
                    >
                        25명의 죽음, 3,370만 개인정보 유출
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#6B7280',
                            textAlign: 'center',
                        }}
                    >
                        더 이상 침묵하지 않겠습니다.
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: 40, color: '#9CA3AF', fontSize: 20 }}>
                    coupang-out.com
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
