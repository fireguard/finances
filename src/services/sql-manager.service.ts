import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable()
export class SqlManagerService {
  private currentVersion = 2;

  constructor(public storage: StorageService) {

  }

  checkVersionDb(): Promise<any> {
    return new Promise((resolve, reject) => {

      this._getVersionDB().then((version) => {
        this._updateNextVersion(version)
          .then(() => {
            resolve(version);
          }, (error) => {
            reject(error);
          });

      }, () => {
        this._initDB().then((version) => {
          this._updateNextVersion(version).then(resolve, reject);
        }, (error) => {
          reject(error);
        });
      });
    });
  }

  _getVersionDB(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.storage.query('SELECT versions.version FROM versions WHERE id = "DB"').then((result) => {
        resolve(parseInt(result.res.rows.item(0).version));
      }, (error) => {
        reject(error);
      });
    });
  }

  _initDB() {
    return new Promise((resolve, reject) => {
      this._createTableVersions()
        .then(this._createTableCategories.bind(this))
        .then(this._createTableAccounts.bind(this))
        .then(this._createTableLaunches.bind(this))
        .then(() => resolve(1))
        .catch((error) => {
          reject(error);
        })
        ;
    });
  }

  _updateNextVersion(version): Promise<any> {
    return new Promise((resolve, reject) => {
      version = parseInt(version);
      if ( version == this.currentVersion ) {
        resolve(version);
      }

      switch (version) {
        case 0:
          this._initDB().then((version) => {
            this._updateNextVersion(version).then(resolve, reject);
          }, (error) => {
            reject(error);
          });
          break;
        case 1:
          this._upVersion2().then((version) => {
            this._updateNextVersion(version).then(resolve, reject);
          }, (error) => {
            reject(error);
          });
          break;
        default:
          reject('Não possível atualizar para a versão '+ (version + 1));
      }
    })
  }

  _saveUpdateVersion(version) {
    let today = new Date();
    return new Promise((resolve, reject) => {
      this.storage.query( `UPDATE versions SET version = ?, date = ? WHERE id = 'DB'`, [version, today.getTime()])
        .then( () => {
          console.log('Banco atualizado para a versão '+version);
          resolve(parseInt(version));
        }, (error) => {
          reject('Não foi possível atualizar o banco para a versão '+ version +': ' + JSON.stringify(error.err.message));
        });
    })
  }

  _clearTables() {
    console.log('Limpando as tabelas do sistema');
    this._removeTables(['versions', 'launches', 'categories', 'accounts'])
      .then(() => {
        console.log('Tabelas removidas com sucesso');
      }, (error) => {
        console.log(error);
      });
  }

  _removeTables(tables: Array<String>): Promise<any> {
    return new Promise((resolve, reject) => {
      tables.forEach( (table) => {
        this.storage.query('DROP TABLE IF EXISTS '+table).catch(reject);
      });
      resolve();
    });
  }

  _upVersion2(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.query(  `
          ALTER TABLE accounts ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'checking'
        `).then( () => {
        this._saveUpdateVersion(2).then(()=> resolve(2), (error)=> reject(error));
      }, (error) => {
        reject('Não foi possível criar o campo type : ' + JSON.stringify(error.err.message));
      });
    });

  }

  _createTableVersions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.query( `
        CREATE TABLE IF NOT EXISTS versions (
          id TEXT,
          version INTEGER,
          date INTEGER
        )
      `).then(() => {
        console.log('Tabela versions criada com sucesso!');
        let today = new Date();
        this.storage.query(`
          INSERT INTO versions (id, version, date) VALUES ('DB', '0', ?)
        `, [today.getTime()]).then(() => {
          console.log('Banco atualizado para a versão 0');
          resolve(0);
        }, (error) => {
          reject('Erro ao inserir a versão atual do banco: ' + JSON.stringify(error.err.message));
        })
      }, (error) => {
        reject('Erro ao criar a tabela versions: ' + JSON.stringify(error.err.message));
      });
    })
  }

  _createTableCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.query(`
        CREATE TABLE IF NOT EXISTS categories
        (id INTEGER PRiMARY KEY AUTOINCREMENT, description TEXT, type TEXT )
      `).then(() => {
        console.log('Tabela categories foi criada com sucesso');
        resolve(true);
      }, (error) => {
        reject('Erro na criação da tabela categories : '+ JSON.stringify(error.err.message));
      });
    });
  }

  _createTableAccounts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.query(`
        CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRiMARY KEY AUTOINCREMENT,
          description TEXT,
          openingBalance value REAL,
          color TEXT,
          includeInResults INTEGER
        )
      `).then(() => {
        console.log('Tabela accounts foi criada com sucesso ');
        resolve();
      }, (error) => {
        reject('Erro na criação da tabela accounts : ' + JSON.stringify(error.err.message));
      });
    });
  }

  _createTableLaunches(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.query(`
        CREATE TABLE IF NOT EXISTS launches (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT,
          value REAL,
          date INTEGER,
          accountId INTEGER,
          categoryId INTEGER,
          type TEXT,
          status INTEGER
      )`).then(() => {
        console.log('Tabela launches foi criada com sucesso ');
        resolve();
      }, (error) => {
        reject('Error Create Table: ' + JSON.stringify(error.err.message));
      });
    });
  }
}