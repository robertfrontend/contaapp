import * as React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import styled from 'styled-components'


import axios from 'axios'
import moment from 'moment'; 


interface DataArticles {
  comment_text: string
  author: string
  created_at: string
  created_at_i: string
  date: string
}

const Home: NextPage = () => {

  const URL = 'https://hn.algolia.com/api/v1/search_by_date?query'

  const [isloader, setLoader] = React.useState<Boolean>(false)
  const [data, setData] = React.useState<[]>([])
  const [search, setSearch] = React.useState<string>('')


  React.useEffect(() => {
    getArticlesAll()
  }, [])


  const getArticlesAll = async () => {
    const defaultSearch: string = 'reactjs'

    setLoader(true)
    try {
      const response = await axios.get(`${URL}=${defaultSearch}`)
      const data: [] = response.data.hits

      let new_date: [] = []

      data.map((dt: DataArticles) => {
        let date = dt.created_at
        const date_ = moment(`${date}`)
        const diff = moment().diff(date_, 'days');
        const diffHour = moment().diff(date_, 'hour');

        const days = moment(date_, "YYYYMMDD").fromNow();
        const minutes = moment(date, 'HH:mm').minutes();
        const hour = moment(date).endOf('day').fromNow()

        let dateString
        if (diffHour >= 24) {
          dateString = `hace ${diff} dias`
        } else {
          if (diffHour <= 1) {
            dateString = `hace ${minutes} minuto${minutes !== 1 && 's'}`
          } else {
            dateString = `hace ${diffHour} hora${diffHour !== 1 && 's'}`
          }
        }

        new_date.push({
          ...dt,
          date: dateString
        })
      })


      setData(new_date)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }


  const hanldeSearch = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`${URL}=${search}`)
      const data: [] = response.data.hits

      let new_date: [] = []

      data.map((dt: DataArticles) => {
        let date = dt.created_at
        const date_ = moment(`${date}`)
        const diff = moment().diff(date_, 'days');
        const diffHour = moment().diff(date_, 'hour');

        const days = moment(date_, "YYYYMMDD").fromNow();
        const minutes = moment(date, 'HH:mm').minutes();
        const hour = moment(date).endOf('day').fromNow()


        let dateString
        if (diffHour >= 24) {
          dateString = `hace ${diff} dias`
        } else {
          if (diffHour <= 1) {
            dateString = `hace ${minutes} minuto${minutes !== 1 && 's'}`
          } else {
            dateString = `hace ${diffHour} hora${diffHour !== 1 && 's'}`
          }
        }

        new_date.push({
          ...dt,
          date: dateString
        })
      })


      setData(new_date)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  return (
    <div>
      <Head>
        <title>Contaapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeContent>
          <header><h1>Buscar articulos</h1>
            <div className="form">
              <input type="text" placeholder='Buscar Articulos...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => hanldeSearch()}
              >Buscar</button>
            </div>
          </header>
          {
            isloader ? ('CARGANDO...')
              : (
                <section className='articles'>
                  {
                    data && (
                      <>
                        {data.map((data: DataArticles, index: number) => (
                          <Articled key={index}>
                            <div dangerouslySetInnerHTML={{ __html: `<p>${data.comment_text || '⛔No Comment⛔'}</p>` }} />
                            <div>
                              <p><b>Author:</b> <span style={{ color: '#3498db' }}>{data.author || '⛔No author⛔'}</span> </p>
                              <p>
                                <b>fecha:</b> {data.date}
                              </p>
                            </div>
                          </Articled>
                        ))}
                      </>
                    )
                  }
                </section>
              )
          }
        </HomeContent>
      </Layout>
    </div>
  )
}

const HomeContent = styled.div`
  header{
    text-align:center;
    input {
      padding: 1em 1em;
      width: 400px;
      border: 2px solid #ecf0f1;
      font-weight:bold;
      border-radius: 8px;
      outline: 2px solid transparent;
      font-size:1em;
      &:focus {
        outline: 2px solid #dde8f0;
        color: #2c3e50;
      }
    }
    button {
      background: #2ecc71;
      border:none;
      padding: 1em 3em;
      font-size:1em;
      font-weight:bold;
      color: white;
      border-radius: 8px;
      margin-left: 1em;
      cursor:pointer;
    }
  }
  .articles{
    /* display:flex;
    flex-direcction:row;
    flex-wrap: wrap; */
    padding-top: 2em;
  }
`

const Articled = styled.div`
  padding:2em;
  margin: 2em 0;
  border-radius: 12px;
  box-shadow: 0px 0px 10px #c2c5c5a2;
  border-left:5px solid #3498db;
  width: 100%;
  margin: 2em 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`




export default Home
