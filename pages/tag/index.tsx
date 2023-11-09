import React, {useState, useEffect} from 'react';
import {Tabs} from 'antd';
import {observer} from 'mobx-react-lite'
import {useStore} from '../../store/index';
import request from '../../service/fetch';
import style from './index.module.scss';
import * as ANTD_ICONS from '@ant-design/icons'

const {TabPane} = Tabs;

interface IUser {
    id: number;
    nickname: string;
    avatar: string;
}

interface ITag {
    id: number;
    title: string;
    icon: string;
    follow_count: number;
    article_count: number;
    users: IUser[]
}

function Tag() {
    const store = useStore();
    const [followTags, setFollowTags] = useState<ITag[]>()
    const [allTags, setAllTags] = useState<ITag[]>()
    const {userId} = store?.user?.userInfo;

    useEffect(() => {
        request('/api/tag/get').then((res: any) => {
            if(res?.code === 0){
                const {followTags = [],allTags = []} = res?.data;
                setFollowTags(followTags);
                setAllTags(allTags)
            }
        })
    },[])

    return (
      <div className='content-layout'>
        <Tabs defaultActiveKey='1'>
            <TabPane tab='已关注标签' key='follow' className={style.tags}>
                {
                    followTags?.map(tag => {
                        return (
                            <div key={tag?.title} className={style.tagWrap}>
                                <div>{ANTD_ICONS[tag?.icon]?.render()}</div>
                                <div className={style.title}>{tag?.title}</div>
                                <div>{tag?.follow_count}关注{tag?.article_count}</div>
                            </div>
                        )
                        
                    })
                }
            </TabPane>
            <TabPane tab='' key='2'></TabPane>
        </Tabs>
      </div>   
    )
}

export default observer(Tag)