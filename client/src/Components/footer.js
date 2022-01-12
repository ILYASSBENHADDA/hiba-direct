import React, {useState, useEffect} from 'react'
import api from '../Api/api'
import Footer from './footerComponents/footer'
import Icon from './footerComponents/icons'

function FooterContainer() {
    const [posts, setPosts] = useState([])
    // Loop data
    const getData = async () => {
        try {
            const {data} = await api.get('get-fundraiser')
            setPosts(data)
            console.log(data)
        } 
        catch (error) {
        alert(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                <Footer.Title>Resent posts</Footer.Title>
                    {posts.slice(0, 4).map((item, key) => (
                        <Footer.Link style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} href={`post/${item._id}`}>{item.title}</Footer.Link>
                    ))}
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Category</Footer.Title>
                    {posts.slice(0, 4).map((item, key) => (
                        <Footer.Link href={`post/${item._id}`}>{item.category_id.name}</Footer.Link>
                    ))}
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Locations</Footer.Title>
                    {posts.slice(0, 4).map((item, key) => (
                        <Footer.Link href={`post/${item._id}`}>{item.city_id.name}</Footer.Link>
                    ))}
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Social</Footer.Title>
                    <Footer.Link href="#"><Icon className="fab fa-facebook-f" />Facebook</Footer.Link>
                    <Footer.Link href="#"><Icon className="fab fa-instagram" />Instagram</Footer.Link>
                    <Footer.Link href="#"><Icon className="fab fa-youtube" />Youtube</Footer.Link>
                    <Footer.Link href="#"><Icon className="fab fa-twitter" />Twitter</Footer.Link>
                </Footer.Column>
            </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}

export default FooterContainer