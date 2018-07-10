import React from 'react';
import player from '../../images/gargoyle_male.png'
import enemy from '../../images/death_knight.png'
import floor from '../../images/tomb_1_old.png'
import { mainWeapon } from './gear'

const Game = props => (
    <div style={{
        backgroundImage: `url(${floor})`
    }}>

        <div
            style={{
                backgroundImage: `url(${floor})`
            }}
        >
            <p style={{
                color: 'white',
                textAlign: 'left'
            }}>Action Log</p>
            <p style={{
                color: 'white',
                textAlign: 'left',
                margin: 0
            }}>
                Enemies Killed:
                    {props.enemiesKilled}
            </p>
        </div>

        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                right: 0,
                backgroundImage: `url(${floor})`
            }}>
            <p style={{
                textAlign: 'right',
                color: 'white'
            }}>{props.enemyHealth}</p>
            <img src={enemy} alt='Enemy' style={{
                position:'fixed',
                right: 0,
                height: '100px',
                width: '100px'
            }}
                onClick={() => props.attack(mainWeapon.dmg)}
            />
            
        <div>
            <img src={player} alt='Player' style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100px',
                height: '100px',
            }} />
        </div>
        </div>


    </div>
);

export default Game;