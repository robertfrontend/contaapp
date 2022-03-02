import Image from 'next/image'
import styled from "styled-components";
import styles from '../styles/Home.module.css'

export default function Layout({ children }: any) {
    return (
        <Content>
            <nav>
                <p>Conta App</p>
            </nav>
            <main>
                {children}
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </Content>
    )
}


const Content = styled.nav`
    nav {
      padding: 0 2rem;
        
        p{
            font-weight:bold;
        }
    }
    main {
      padding: 0 5em;
        min-height: 100vh;
    }

`