import { Landing } from "../../pages"
import { styled } from "styled-components"
const Wrapper=styled.main`
  nav{
    width:90vw;
    max-width:1120px;
    height:6rem;
    margin:0 auto;
    align-items:center;
    display:flex;
  }
  .page{
    min-height:calc(100vh-6rem);
    display:grid;
    align-items:center;
  }
  h1{
    font-weight:700;
    span{
      color:#3b82f6;
    }
  }
  p{
    color:#486581;
  }
  .main-img{
    display:none;
  }
  @media (min-width:992px){
    .page{
      display:grid;
      grid-template-columns:1fr 1fr;
      column-gap:3rem;
    }
    .main-img{
      display:block;
    }
  }
`
export default Wrapper