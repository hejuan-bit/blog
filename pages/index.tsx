import React  from "react";
import {prepareConnection} from '../db/index';
import { Article } from "../db/entity/index";
import ListItem from "../components/ListItem";
import {Divider} from 'antd'


interface IArticle {

}

interface IProps {
  articles: IArticle[]
}

export async function getServerSideProps(context){
  const db = await prepareConnection();
  const article = await db.getRepository(Article).find({
    relations: ['user']
  })
  return {
    props: {
      articles: JSON.parse(JSON.stringify(article))
    }
  }
}

function HomePage(props: IProps) {
  const {articles} = props;
  return (
    <div className='content-layout'>
        <div>
          {
            articles?.map(article => (
              <>
                <ListItem article={article} />
                <Divider/>
              </>
            ))
          }
      </div>
    </div>
  )
}
  
export default HomePage;