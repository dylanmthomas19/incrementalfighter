import React, { Component } from "react";
import NavTabs from './navtabs'
import Game from './pages/game'
import { enemy } from '../images/enemyPool'
import Contact from './pages/contact'
import { Gear } from './pages/gear'
import Stats from './pages/stats'

class GameContainer extends Component {
  state = {
    currentPage: "Game",
    enemyHealth: 100,
    enemyDamage: 1,
    playerHealth: 50,
    enemiesKilled: 0,
    playerDeaths:0,
    bossesBeat:0,
    bossFight: false,
    actions: []
  };
  remove = (items, index) => {
    return [...items.slice(0, index),
    ...items.slice(index + 1, items.length)];
  };
  attack = dmg => {
    let playerFullDmg =dmg + Math.ceil((this.state.enemiesKilled*1.1))
    let enemyFullDmg = Math.floor((this.state.enemyDamage)+(this.state.playerDeaths*.5)-(this.state.bossesBeat*.5))
    if(this.state.enemiesKilled % 5 === 1){
      this.setState({enemyDamage: this.state.enemyDamage+1})
    }
    if(this.state.enemiesKilled>=5)
    if(this.state.enemiesKilled>=5&&this.state.enemiesKilled % 5 === 0){
      console.log(this.state.bossFight)
      this.setState({bossFight:true,actions:[...this.state.actions, `||BOSS FIGHT||`]})
      enemyFullDmg=Math.floor(enemyFullDmg*1.55)
    }
    this.setState({ enemyHealth: this.state.enemyHealth - playerFullDmg, playerHealth: this.state.playerHealth - enemyFullDmg, actions: [...this.state.actions, `|| Attacked enemy for ${playerFullDmg}, Enemy hit you for ${enemyFullDmg}`] })
    if (this.state.enemyHealth <= playerFullDmg) {
      this.setState({ enemyHealth: 100 + (this.state.enemiesKilled * 10),playerHealth: Math.ceil(this.state.playerHealth+5), enemiesKilled: this.state.enemiesKilled + 1, actions: [...this.state.actions, `|| Killed the Enemy!`] })
      console.log(this.state.playerHealth, this.state.enemyHealth)
      enemy()
      if(this.state.bossFight===true){
        this.setState({bossFight:false, bossesBeat:this.state.bossesBeat+1})
      }
    }
    if (this.state.playerHealth <= enemyFullDmg) {
      this.setState({enemyHealth: 100+(this.state.enemiesKilled * 10),playerHealth:Math.ceil(50+((this.state.enemiesKilled+1)*2.5)), playerDeaths: this.state.playerDeaths+1, actions:[...this.state.actions, '||The Enemy Killed you!']})
    }
    if (this.state.actions.length >= 5) {
      this.setState({ actions: this.remove(this.state.actions, 0) })
    }
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  returnState = () => {
    return this.state.enemiesKilled;
  }
  renderPage = () => {
    switch (this.state.currentPage) {
      case "Game":
        return <Game
          actions={this.state.actions}
          playerHealth={this.state.playerHealth}
          playerDeaths = {this.state.playerDeaths}
          enemiesKilled={this.state.enemiesKilled}
          bossesBeat={this.state.bossesBeat}
          enemyHealth={this.state.enemyHealth}
          attack={this.attack} />
      case "Gear":
        return <Gear
          bossesBeat={this.state.bossesBeat}
          enemiesKilled={this.state.enemiesKilled}
          playerDeaths={this.state.playerDeaths} />
      case "Stats":
        return <Stats
          enemiesKilled={this.state.enemiesKilled}
          playerDeaths={this.state.playerDeaths} />
      default:
        return <Contact />
    }
  };
  render() {
    return (
      <div>
        <NavTabs
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default GameContainer