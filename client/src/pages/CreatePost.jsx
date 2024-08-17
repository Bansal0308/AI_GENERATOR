import React from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GenerateImageCard from "../components/GenerateImageCard";
import { useState } from "react";

const Container=styled.div`
    height:100%;
    overflow-y:scroll;
    backround:${({theme})=> theme.bg};
    padding:30px 30px;
    padding-bottom:50px;
    display:flex;
    flex-direction:column;
    align-items:center;

    gap:20px;
    justify-content:center;
    @media (max-width:768px){
        padding:6px 10px;
    }
`

const Wrapper=styled.div`
    width:100%;
    padding:30px;
    height:fit-content;
    max-width:1000px;
    gap:8%;
    display:flex;
    justify-content:center;
    @media (max-width:768px)
    {
        flex-direction:column;
    }

`;


function CreatePost(){

    const[generateImageLoading,setGenerateImageLoading]=useState(false);
    const[createPostLoading,setCreatePostLoading]=useState(false);

    const [post,setPost]=useState({
        name:"",
        prompt:"",
        photo:""
    });
    

    return (
    <Container>
        <Wrapper>
            <GenerateImageForm post={post} setPost={setPost} createPostLoading={createPostLoading}
             generateImageLoading={generateImageLoading} setGenerateImageLoading={setGenerateImageLoading}
             setCreatePostLoading={setCreatePostLoading}/>
            <GenerateImageCard src={post?.photo} loading={generateImageLoading}/>
        </Wrapper>
    </Container>
    );
}

export default CreatePost;