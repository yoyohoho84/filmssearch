import React, { Component } from 'react';
import styled from 'styled-components';
import {dataTags} from '../constants/data';
import {dataFilm} from '../constants/data';

const StyledWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const StyledList = styled(StyledWrapper)`
  display: flex;
  flex-direction: column;
`;

const PickedList = styled(StyledWrapper)`
  border: 1px solid black;
  padding: 20px ;
  max-width: 300px;  
  display: flex;
  flex-direction: column;
`;


class MainContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            tags: dataTags,
            films: dataFilm,
            pickedList: [],
            // pickedList: dataFilm,
        };
        this.handleClick = this.handleClick.bind(this);
        this.getItemByTitle = this.getItemByTitle.bind(this);
    }

    // componentDidMount() {
    //     this.setState({
    //
    //     })
    //
    // }


     getItemByTitle = (title) => {
        return JSON.parse(localStorage.getItem('pickedList')).filter(item => item.title !== title)
    }


    handleClick = (e) => {
      const {pickedList, films} = this.state;
      const newArr = pickedList;
      const title = e.target.textContent || e.target.innerText;
      const picked = films.find(e => e.title === title);
      const check = newArr.find(e => e.title === picked.title);
      if(check !== picked){
          console.log('push to array');
          newArr.push(picked);
          localStorage.setItem('pickedList', JSON.stringify(newArr));
          this.setState({
              pickedList: newArr
          })
      }
      else {
          const favor = this.getItemByTitle(picked.title)
          localStorage.setItem('pickedList', JSON.stringify(favor));

          this.setState(prevState => ({
              pickedList: prevState.pickedList.filter(i => i.title !== picked.title)
          }));
          console.log('Same film!')
          console.log(favor)
      }

    };




    render() {

        const {films, pickedList } = this.state;

        const renderList = films.map((item, i)=> {
            const {title} = item;
            return (
                <div>
                    <p id={i} key={i} onClick={this.handleClick}>{title}</p>
                </div>
            )
        });
        const renderPicked = pickedList.map((item)=> {
            const {title, tag} = item;
            return (
                <div>
                    <p>{title}</p>
                    <p>{tag}</p>
                </div>
            )
        });

        return (
            <div>

                <StyledWrapper>

                    henllo

                    <StyledList>
                        {renderList}
                    </StyledList>

                    <PickedList>
                        {renderPicked}
                    </PickedList>

                </StyledWrapper>
            </div>
        );
    }
}

export default MainContainer;