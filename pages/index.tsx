import React  from "react";
import {prepareConnection} from '../db/index';
import { Article } from "../db/entity/index";
import ListItem from "../components/ListItem";

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
  console.log(articles,'articles')
  return (
    <div>
      {
        articles?.map(article => (
          <ListItem article={article} />
        ))
      }
  </div>
  )
}
  
export default HomePage;