import './styles/Noticias.css';

import React, { Component } from 'react';

import ClienteGql from '../utils/GqlClient';
import Lista1 from '../componentesNoticia/Lista1Noticias';
import Lista2 from '../componentesNoticia/Lista2Noticias';
import Peticiones from '../utils/consultasPersonalizadas';

//Listas

const GQLClient = ClienteGql;

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      nextPage: 1,
      noticiasFecha: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });

    try {
      const variables = {
        page: this.state.nextPage,
      };
      const respuesta = await GQLClient.request(
        Peticiones.getNoticiasFecha,
        variables
      );
      this.setState({
        loading: false,
        noticiasFecha: this.state.noticiasFecha.concat(
          respuesta.getNoticiasFecha
        ),
        nextPage: this.state.nextPage + 1,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    return (
      <section className="contenedorNoticias">
        <div className="elemento">
          <Lista1 noticiasFecha={this.state.noticiasFecha} />
        </div>
        <div className="elemento">
          <Lista2 noticiasFecha={this.state.noticiasFecha} />
        </div>
        <div className="elemento">item #3</div>
        <div className="elemento">item #4</div>
      </section>
    );
  }
}

export default Noticias;
