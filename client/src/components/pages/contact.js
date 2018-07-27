import React, { Component } from "react";
import API from "../../utils/API";


class Contact extends Component {

    consoleLog() {
        console.log(window.ModalLogin.state.user.email);
    }

    Save() {


        if (window.ModalLogin.state.user === undefined) {

            alert("Please log in to access the save function");

        }
        else {

            API.saveGame({
                email: window.ModalLogin.state.user.email,
                enemyHealth: window.GameContainer.state.enemyHealth,
                enemyDamage: window.GameContainer.state.enemyDamage,
                playerHealth: window.GameContainer.state.playerHealth,
                enemiesKilled: window.GameContainer.state.enemiesKilled,
                playerDeaths: window.GameContainer.state.playerDeaths,
                bossesBeat: window.GameContainer.state.bossesBeat
            })
                .then(response => {
                    console.log(response);
                })
                .catch(err => console.log(err));
            alert("Game Saved!");
        }


    };



    Load() {
        if (window.ModalLogin.state.user === undefined) {

            alert("Please log in to access the load function");

        }
        else {
            API.loadGame(window.ModalLogin.state.user.email)
                .then(res => {

                    let lastSave = res.data

                        window.GameContainer.setState({
                            currentPage: "Game",
                            enemyHealth: lastSave.enemyHealth,
                            enemyDamage: lastSave.enemyDamage,
                            playerHealth: lastSave.playerHealth,
                            enemiesKilled: lastSave.enemiesKilled,
                            playerDeaths: lastSave.playerDeaths,
                            bossesBeat: lastSave.bossesBeat
                        })
                })
                .then(window.GameContainer.render())
                .catch(err => console.log(err));
            alert("Game Loaded! \n THIS WILL RESET THE OPPONENT IMAGES!")
        }

    };

    sessionSave() {
        localStorage.setItem("save", JSON.stringify({
            enemyHealth: window.GameContainer.state.enemyHealth,
            enemyDamage: window.GameContainer.state.enemyDamage,
            playerHealth: window.GameContainer.state.playerHealth,
            enemiesKilled: window.GameContainer.state.enemiesKilled,
            playerDeaths: window.GameContainer.state.playerDeaths,
            bossesBeat: window.GameContainer.state.bossesBeat
        }));
    }

    sessionLoad() {
        let data = localStorage.getItem("save");
        let lastSave = JSON.parse(data);
        window.GameContainer.setState({
            currentPage: "Game",
            enemyHealth: lastSave.enemyHealth,
            enemyDamage: lastSave.enemyDamage,
            playerHealth: lastSave.playerHealth,
            enemiesKilled: lastSave.enemiesKilled,
            playerDeaths: lastSave.playerDeaths
        });
        window.GameContainer.render();
    };



    render() {
        return (
            <div style={{height:500}}>
                <p>
                    <a href="https://github.com/dylanmthomas19/incrementalfighter">Source Code</a> for this game.
                    <a href="https://github.com/ephillipsiii/incrementalFighter1.2">Source Code</a> backup, from <a href="https://www.linkedin.com/in/edford-phillips-771840156/">Edford Phillips</a>.
                </p>
                <br />
                    <a href="https://www.linkedin.com/in/dylanmthomas19">LinkedIn</a> page for Dylan Thomas.
                <br />
                    <a href="">Link</a> for Johnny Ey
                <br />
                    <a href="">Link</a> for Matt K
                <br />
                <div>
                    <button onClick={this.Save} id = 'saveButton' >
                        SAVE
                    </button>
                    <button onClick={this.Load} id = 'loadButton' >
                        LOAD
                    </button>
                </div>
            </div>
        )
    }
};
export default Contact;
