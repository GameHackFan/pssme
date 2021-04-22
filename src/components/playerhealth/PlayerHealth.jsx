import React, {Component} from 'react';
import PlayerHealthComponent from
    './PlayerHealthComponent';

import romService from '../../service/ROMService';
import playerHealthMap from
    '../../data/replace/PlayerHealthMap';


class PlayerHealth extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerHealth =
        this.getPlayerHealth.bind(this);
    this.setPlayerHealth =
        this.setPlayerHealth.bind(this);
    this.onDefaultValueClick =
        this.onDefaultValueClick.bind(this);
  }

  handleChange(event)
  {
    const {name, value} = event.target;
    
    if(event.target.name === "health")
    {
      this.setPlayerHealth(parseInt(value));
      this.setState({[this.state.playerKey]: value});
    }
    else
      this.setState({[name]: value});
  }

  onDefaultValueClick(event)
  {
    let ph = playerHealthMap[this.state.playerKey];

    if(ph)
    {
      let v = ph.defaultValue;
      this.setPlayerHealth(v);
      this.setState({[this.state.playerKey]: v});
    }
  }

  setPlayerHealth(value)
  {
    try
    {
      let ph = playerHealthMap[this.state.playerKey];
      ph = ph ? ph : {};
      const {filename, byteIndex} = ph;
      romService.setByte(filename, byteIndex, value);
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
    }
  }

  getPlayerHealth()
  {
    try
    {
      let health = this.state[this.state.playerKey];

      if(health === null || health === undefined)
      {
        let ph = playerHealthMap[this.state.playerKey];
        health = ph ? romService.getByte(
            ph.filename, ph.byteIndex) : 0;
      }

      return health;
    }
    catch(e)
    {
      console.log(e.message);
      console.log(e);
    }
  }

  render()
  {
    return (
      <PlayerHealthComponent
        playerHealthMap={playerHealthMap}
        romReady={romService.isROMReady()}
        playerKey={this.state.playerKey}
        health={this.getPlayerHealth()}
        handleChange={this.handleChange}
        onDefaultValueClick=
          {this.onDefaultValueClick}
      />
    );
  } 
}

export default PlayerHealth;