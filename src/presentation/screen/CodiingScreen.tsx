import React from "react";
import {View, StyleSheet, Text, Button} from 'react-native';

const preset = [3,2,4,1,5,6,9,8,7,10,15,12,11,14,13];
const len = 15;
let groups:number[][] = new Array();
let visited:Set<number> = new Set();
let pair:number[][] = new Array();


//현재의 노드와 담을 배열 
function dfs(node:number, group:number[]){
   
    if(visited.has(node)) return;

    visited.add(node);
    group.push(node);

    for(const e of pair) {
        const[a, b] = e;
        //두개의 구성중 하나의 요소 들어 있으면 다른 요소가 방문 안했으면 depth를 더체크한다. 

        if(a === node && !visited.has(b)){
            dfs(b, group);
        }else if(b === node && !visited.has(a)){
            dfs(a,group);
        }

    }
   
}

export default function CodingScreen() {
    let result = 0; 
    let pairarry = makepair();
    pair = pairarry;

    for(const node of preset) {
        const group = new Array();
        dfs(node,group);
        if(group.length > 0) {
           groups.push(group);     
        }
        
    }
    
    
    let arr = groups.filter(it => it.length > 1);

    arr.forEach((value) => {
        result += value.length - 1;
    }) 

    return(
        <View style={{alignContent:'center'}}>
            <Text style={{textAlign:'left', fontSize:18,padding:30}}> 
                DFS 알고리즘 공부 순열검색 알고리즘 
                입력으로 1차원배열과 [3,2,4,1,5,6,9,8,7], 9 를 입력받아 
                그룹을 나누고 간선의 개수를 구한다. 
            </Text>
            <Text>======= 그룹핑 값 ========= ↔️↔️↔️↔️↔️</Text>
            <Text style={{textAlign:'left', fontSize:12,padding:10}}> 
                dfs를 돌면서 연결된 노드를 찾아서 그룹핑한다. 
            </Text>
            {groups.map((pair, index) => (
                <View key={index} style={styles.txt}>
                <Text style={styles.txt}>
                    {index + 1}번 쌍: [ {pair.join(', ')} ]
                </Text>
                </View>
            ))}
            <Text style={{textAlign:'center', fontSize:20, fontStyle:'italic'}}>간선의 개수는 = {result}</Text>
        </View>
    )
}

//쌍으로 만든다 (연결된 노드를 표시)
const makepair = () => {

    
    for(let i=1; i<=len;i++){
        pair.push([i, preset[i-1]]);
    }

    return pair;
 
}

const styles = StyleSheet.create({
    txt:{
      padding:3,
      tintColor:"#227"  
    }
})

