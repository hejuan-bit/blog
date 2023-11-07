import Link from 'next/link';

const ListItem = (props: any) => {
    const {article} = props
    return(
        <Link href={`/article/${article.id}`}>
            <div></div>
        </Link>
    )
}

export default ListItem