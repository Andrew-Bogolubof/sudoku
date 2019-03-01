module.exports = function solveSudoku(matrix) {
 
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if ( matrix[i][j] == 0 ) {
      matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      checkRow(i, j, matrix);
      checkCol(i, j, matrix);
      checkBox(i, j, matrix);
        if (matrix[i][j].length == 1 ) {
          matrix[i][j] = matrix[i][j][0];
        } 
      }
    }
  }


  function hideAlone(matrix) {

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if ( Array.isArray(matrix[i][j]) ) {
          checkRow(i, j, matrix);
          checkCol(i, j, matrix);
          checkBox(i, j, matrix);
        }
        if (matrix[i][j].length == 1 ) {
          matrix[i][j] = matrix[i][j][0];
        } 
        if ( Array.isArray(matrix[i][j]) ) {
          blindAloneRow(i, j, matrix);
        }
        if ( Array.isArray(matrix[i][j]) ) {
          blindAloneCol(i, j, matrix);
        }
      }
    }
  }

  hideAlone(matrix); hideAlone(matrix); hideAlone(matrix); hideAlone(matrix);
  
  return solveModule(matrix);

  function solveModule(mat) {
    if ( checkRowFinal(mat) && checkColFinal(mat) && checkBoxFinal(mat) ) {
      return mat;
    } 

    for (let rs = 0; rs < 9; rs++) {
      for (let cs = 0; cs < 9; cs++) {
        if ( Array.isArray(mat[rs][cs]) ) {
          if (mat[rs][cs].length == 0) {
            return;
          }
        }
      }
    }
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if( Array.isArray(mat[i][j]) ) {

          mark:
          for (let k = 0; k < mat[i][j].length; k++) {
            let helpMat = JSON.parse(JSON.stringify(mat));
            helpMat[i][j] = mat[i][j][k];
            hideAlone(helpMat); hideAlone(helpMat); hideAlone(helpMat);
            for (let rs = 0; rs < 9; rs++) {
              for (let cs = 0; cs < 9; cs++) {
                if ( Array.isArray(helpMat[rs][cs]) ) {
                  if (helpMat[rs][cs].length == 0) {
                    continue mark;
                  }
                }
              }
            }
            let resultMat;
            resultMat = solveModule(helpMat);
            
            if (  !(resultMat == undefined) && checkRowFinal(resultMat) && checkColFinal(resultMat) && checkBoxFinal(resultMat) ) {
              return resultMat;
            } 
          }
        }
      }
    }
  }


  

  function checkRowFinal(matrix) {

    for (let i = 0; i < 9; i++) {
      let sum = 0;
  
      for (let j = 0; j < 9; j++) {
        if ( Array.isArray(matrix[i][j]) ) {
  
          return false;
  
        }
        sum += matrix[i][j];
      }
  
      if ( sum == 45 ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
  
  function checkColFinal(matrix) {
    
    for (let j = 0; j < 9; j++) {
      let sum = 0;
  
      for (let i = 0; i < 9; i++) {
        if ( Array.isArray(matrix[i][j]) ) {
  
          return false;
  
        }
        sum += matrix[i][j];
      }
  
      if ( sum == 45 ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
  
  function checkBoxFinal(matrix) {
    
    for (let i = 0; i <= 6; i += 3){
      for (let j = 0; j <= 6; j += 3){
        if ( !boxChecker(i, i + 3, j, j + 3) ) {
          return false;
        }
      }
    }
    return true;
  
    function boxChecker (i, endi, j, endj){
      let sumBox = 0;
      let jStart = j;
      for (; i < endi; i++) {
        for (; j < endj; j++) {
          sumBox += matrix[i][j];
        }
        j = jStart;
      }
      return ( sumBox == 45 ) ? true : false;
    }
  }

  function checkRow(i, j, matrix) {

    for (let k = 0; k < 9; k++ ) {   
      if( !Array.isArray(matrix[i][k]) ) {
        let num = matrix[i][j].indexOf(matrix[i][k]);
        // console.log(matrix[i][j], matrix[i][k]);
        if ( num != -1 ) {
          matrix[i][j].splice(num, 1);
        }
      }
    }
  }
    
  function checkCol(i, j, matrix) {
    for (let k = 0; k < 9; k++ ) {   
      if( !Array.isArray(matrix[k][j]) ) {
        let num = matrix[i][j].indexOf(matrix[k][j]);
        if ( num != -1 ) {
          matrix[i][j].splice(num, 1);

        }
      }
    } 
  }
    
  function checkBox(i, j, matrix) {
    let k = Math.floor( i / 3 ) * 3; let endk = k + 3;
    let m = Math.floor( j / 3 ) * 3; let endm = m + 3;

    for (; k < endk; k++) {
      for (; m < endm; m++) {
        if( !Array.isArray(matrix[k][m]) ) {
          let num = matrix[i][j].indexOf(matrix[k][m]);
          if ( num != -1 ) {
            matrix[i][j].splice(num, 1);
          }
        }
      }
      m = Math.floor( j / 3 ) * 3;
    }
  }
  
  function blindAloneRow(i, j, matrix) {
    let helpMatrix = JSON.parse(JSON.stringify(matrix));
 
    for (let k = 0; k < 9; k++ ) {   
      if ( k == j ) {
        continue;
      }
      if( Array.isArray(matrix[i][k]) ) { 
        for (let m = 0; m < 9; m++) {
          let num = helpMatrix[i][j].indexOf(matrix[i][k][m]);
          if ( num != -1 ) {
            helpMatrix[i][j].splice(num, 1);
          }
          if ( helpMatrix[i][j].length == 0 ){
            return;
          } 
        }    
      }
    }
    if ( helpMatrix[i][j].length == 1) {
      matrix[i][j] = helpMatrix[i][j][0];
    }
  }

  function blindAloneCol(i, j, matrix) {
    let helpMatrix = JSON.parse(JSON.stringify(matrix));
 
    for (let k = 0; k < 9; k++ ) {   
      if ( k == i ) {
        continue;
      }
      if( Array.isArray(matrix[k][j]) ) { 
        for (let m = 0; m < 9; m++) {
          let num = helpMatrix[i][j].indexOf(matrix[k][j][m]);
          if ( num != -1 ) {
            helpMatrix[i][j].splice(num, 1);
          }
          if ( helpMatrix[i][j].length == 0 ){
            return;
          } 
        }    
      }
    }
    if ( helpMatrix[i][j].length == 1) {
      matrix[i][j] = helpMatrix[i][j][0];
    }
  }

}
