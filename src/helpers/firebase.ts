// FROM SHARED. DO NOT COPY

import loggerHelper from "../loggerHelper";
import * as _ from "lodash";

const containUndefinedValues = (data: any) => {
  return false;
};

export default class DBHelper {
  db: any;
  constructor(db: any) {
    this.db = db;
  }
  async batchAdd(collection: string, data: any) {
    const batchArray = new Array();
    batchArray.push(this.db.batch());
    let operationCounter = 0;
    let batchIndex = 0;
    for (const document of data) {
      const docRef = this.db.collection(collection).doc();
      //console.log(docRef,document.id)
      batchArray[batchIndex].set(docRef, document);
      operationCounter++;
      if (operationCounter === 499) {
        batchArray.push(this.db.batch());
        batchIndex++;
        operationCounter = 0;
      }
    }

    batchArray.forEach(
      async (batch: any) =>
        await batch
          .commit()
          .then(function () {
            //DO NTG
          })
          .catch((e: any) => {
            loggerHelper.report("batchAdd - " + e);
          }),
    );
    return batchArray;
  }

  async batchUpdate(collection: string, data: any) {
    const batchArray = new Array();
    batchArray.push(this.db.batch());
    let operationCounter = 0;
    let batchIndex = 0;
    for (const document of data) {
      const docRef = this.db.collection(collection).doc(document.id);
      const doc = { ...document };
      delete doc.id;

      batchArray[batchIndex].update(docRef, doc);
      operationCounter++;
      if (operationCounter === 499) {
        batchArray.push(this.db.batch());
        batchIndex++;
        operationCounter = 0;
      }
    }

    batchArray.forEach(
      async (batch: any) =>
        await batch
          .commit()
          .then(function () {
            //DO NTG
          })
          .catch((e: any) => {
            loggerHelper.report("batchUpdate- " + e);
          }),
    );
    return batchArray;
  }

  async batchSet(collection: string, data: any) {
    const batchArray = new Array();
    batchArray.push(this.db.batch());
    let operationCounter = 0;
    let batchIndex = 0;
    for (const document of data) {
      const docRef = this.db.collection(collection).doc(document.id);
      const doc = { ...document };
      delete doc.id;

      batchArray[batchIndex].set(docRef, doc);
      operationCounter++;
      if (operationCounter === 499) {
        batchArray.push(this.db.batch());
        batchIndex++;
        operationCounter = 0;
      }
    }

    batchArray.forEach(
      async (batch: any) =>
        await batch
          .commit()
          .then(function () {
            //DO NTG
          })
          .catch((e: any) => {
            loggerHelper.report("batchSet- " + e);
          }),
    );
    return batchArray;
  }

  async batchDelete(collection: string, data: any) {
    const batchArray = new Array();
    batchArray.push(this.db.batch());
    let operationCounter = 0;
    let batchIndex = 0;
    for (const document of data) {
      const docRef = this.db.collection(collection).doc(document.id);
      //console.log(docRef,document.id)
      batchArray[batchIndex].delete(docRef);
      operationCounter++;
      if (operationCounter === 499) {
        batchArray.push(this.db.batch());
        batchIndex++;
        operationCounter = 0;
      }
    }

    batchArray.forEach(
      async (batch: any) =>
        await batch
          .commit()
          .then(function () {
            //DO NTG
          })
          .catch((e: any) => {
            loggerHelper.report("batchDelete - Error " + e);
          }),
    );
    return batchArray;
  }

  async setDataToCollection(collection: string, id: string, data: any) {
    if (!containUndefinedValues(data)) {
      return await this.db
        .collection(collection)
        .doc(id)
        .set(data)
        .catch((e: any) => {
          const error = "setDataToCollection - " + collection + " - " + id + " - " + e;
          loggerHelper.report(error);
        });
    } else {
      const error = "setDataToCollection - " + collection + " - " + id + " - " + "Data contain undefined values";
      loggerHelper.report(error);
      return {
        error: error,
        data: data,
      };
    }
  }

  async setAndUpdateDataToCollection(collection: string, id: string, data: any, merge: boolean = false) {
    if (!containUndefinedValues(data)) {
      return await this.db
        .collection(collection)
        .doc(id)
        .set(data, { merge })
        .catch((e: any) => {
          const error = "setDataToCollection - " + collection + " - " + id + " - " + e;
          loggerHelper.report(error);
        });
    } else {
      const error = "setDataToCollection - " + collection + " - " + id + " - " + "Data contain undefined values";
      loggerHelper.report(error);
      return {
        error: error,
        data: data,
      };
    }
  }

  async addDataToCollection(collection: string, data: any) {
    if (!containUndefinedValues(data)) {
      return await this.db
        .collection(collection)
        .add(data)
        .catch((e: any) => {
          const error = "addDataToCollection - " + collection + " - " + e;
          loggerHelper.report(error);
        });
    } else {
      const error = "addDataToCollection - " + collection + " - " + "Data contain undefined values";
      loggerHelper.report(error);
      return {
        error: error,
        data: data,
      };
    }
  }

  async updateDataToCollection(collection: string, id: string, data: any) {
    if (!containUndefinedValues(data)) {
      return await this.db
        .collection(collection)
        .doc(id)
        .update(data)
        .catch((e: any) => {
          const error = "updateDataToCollection - " + collection + " - " + id + " - " + e;
          loggerHelper.report(error);
        });
    } else {
      const error = "updateDataToCollection - " + collection + " - " + id + " - " + "Data contain undefined values";
      loggerHelper.report(error);
      return {
        error: error,
        data: data,
      };
    }
  }

  async deleteData(collection: string, id: string) {
    return await this.db
      .collection(collection)
      .doc(id)
      .delete()
      .catch((e: any) => {
        const error = "deleteData - " + collection + " - " + id + " - " + e;
        loggerHelper.report(error);
      });
  }

  async getAllDataFromCollectionBetweenDates(collection: string, whatIs: string, startDate: Date, endDate: Date) {
    const returnArray: Array<any> = [];
    const docRef = this.db.collection(collection);
    await docRef
      .where(whatIs, ">", startDate)
      .where(whatIs, "<", endDate)
      .get()
      .then(function (snapshot: any) {
        snapshot.forEach(function (doc: any) {
          if (doc && doc.exists && doc.data && doc.id) {
            const result = doc.data();
            result["id"] = doc.id;
            returnArray.push(result);
          }
        });
      })
      .catch((e: any) => {
        const error = "getAllDataFromCollectionBetweenDates - " + collection + " - " + whatIs + " - " + e;
        loggerHelper.report(error);
      });
    return returnArray;
  }

  async getAllDataFromCollectionWithWhereIn(collection: string, whatIs: string, equalTo: Array<any>, arrayWhere: Array<any> = []) {
    const returnArray = new Array();
    const equalToChunked = _.chunk(equalTo, 10);
    let docRef = this.db.collection(collection);
    for (const prop in arrayWhere) {
      docRef = docRef.where(prop, "==", arrayWhere[prop]);
    }
    for (let i = 0; i < equalToChunked.length; i++) {
      await docRef
        .where(whatIs, "in", equalToChunked[i])
        .get()
        .then(function (snapshot: any) {
          snapshot.forEach(function (doc: any) {
            if (doc && doc.exists && doc.data && doc.id) {
              const result = doc.data();
              result["id"] = doc.id;
              returnArray.push(result);
            }
          });
        })
        .catch((e: any) => {
          const error = "getAllDataFromCollectionWithWhereIn - " + collection + " - " + whatIs + " - " + e;
          loggerHelper.report(error);
        });
    }
    return returnArray;
  }

  async getAllDataFromCollectionFromIds(collection: string, equalTo: Array<any>) {
    const returnArray: Array<any> = [];
    if (equalTo?.length) {
      const docRef = this.db.collection(collection);
      const equalToUniq = _.uniq(equalTo);

      const equalToChunked = _.chunk(equalToUniq, 10);
      for (const tenBloc of equalToChunked) {
        await docRef
          .where("__name__", "in", tenBloc)
          .get()
          .then(function (snapshot: any) {
            snapshot.forEach(function (doc: any) {
              if (doc && doc.exists && doc.data && doc.id) {
                const result = doc.data();
                result["id"] = doc.id;
                returnArray.push(result);
              }
            });
          })
          .catch((e: any) => {
            const error = "getAllDataFromCollectionFromIds - " + collection + " - " + e;
            loggerHelper.report(error);
          });
      }
    }
    return returnArray;
  }

  async getAllDataFromCollectionWithWhere(collection: string, whatIs: string, equalTo: any) {
    const returnArray: Array<any> = [];
    const docRef = this.db.collection(collection);
    await docRef
      .where(whatIs, "==", equalTo)
      .get()
      .then(function (snapshot: any) {
        snapshot.forEach(function (doc: any) {
          if (doc && doc.exists && doc.data && doc.id) {
            const result = doc.data();
            result["id"] = doc.id;
            returnArray.push(result);
          }
        });
      })
      .catch((e: any) => {
        const error = "getAllDataFromCollectionWithWhere - " + collection + " - " + whatIs + " - " + equalTo + " - " + e;
        loggerHelper.report(error);
      });
    return returnArray;
  }

  async getAllDataFromCollection(collection: string) {
    const returnArray: Array<any> = [];
    const docRef = this.db.collection(collection);
    await docRef
      .get()
      .then(function (snapshot: any) {
        snapshot.forEach(function (doc: any) {
          if (doc && doc.exists && doc.data && doc.id) {
            const result = doc.data();
            result["id"] = doc.id;
            returnArray.push(result);
          }
        });
      })
      .catch((e: any) => {
        const error = "getAllDataFromCollection - " + collection + " - " + e;
        loggerHelper.report(error);
      });
    return returnArray;
  }

  async getDocFromCollectionOnSnapshot(collection: string, docId: string, callBack: any) {
    if (docId) {
      const docRef = this.db.collection(collection);
      const snap = docRef.doc(docId).onSnapshot(
        (doc: any) => {
          if (doc && doc.exists && doc.data && doc.id) {
            const resultQuery: any = doc.data();
            resultQuery.id = doc.id;
            callBack(resultQuery);
            return doc;
          }
        },
        (e: any) => {
          const error = `getDocFromCollectionOnSnapshot - ${collection} - ${docId} - ${e}`;
          loggerHelper.report(error);
        },
      );
      return snap;
    }
  }

  async getDocFromCollection(collection: string, docId: string) {
    if (docId) {
      const docRef = this.db.collection(collection);
      const result = await docRef
        .doc(docId)
        .get()
        .then(function (doc: any) {
          if (doc && doc.exists && doc.data && doc.id) {
            const resultQuery: any = doc.data();
            resultQuery["id"] = doc.id;
            return resultQuery;
          }
        })
        .catch((e: any) => {
          const error = "getDocFromCollection - " + collection + " - " + docId + " - " + e;
          loggerHelper.report(error);
        });
      return result;
    }
  }

  async getDocFromCollectionWithWhere(collection: string, arrayWhere: Array<any>) {
    let docRef = this.db.collection(collection);
    for (const prop in arrayWhere) {
      docRef = docRef.where(prop, "==", arrayWhere[prop]);
    }
    const result = await docRef
      .get()
      .then(function (snapshot: any) {
        if (!snapshot.empty) {
          const r: any = snapshot.docs[0].data();
          r["id"] = snapshot.docs[0].id;
          return r;
        } else {
          return false;
        }
      })
      .catch((e: any) => {
        const error = "getDocFromCollectionWithWhere - " + collection + " - " + e;
        loggerHelper.report(error);
      });
    return result;
  }

  async getAllDataFromCollectionWithWhereArrayOnSnapshot(collection: string, arrayWhere: Array<any>, callBack: any) {
    let docRef = this.db.collection(collection);
    const keys = Object.keys(arrayWhere);
    for (let i = 0; i < keys.length; i += 1) {
      const prop: any = keys[i];
      docRef = docRef.where(prop, "==", arrayWhere[prop]);
    }
    const snap = docRef.onSnapshot(
      (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          const result = { ...{ id: change.doc.id }, ...change.doc.data() };
          callBack(change.type, result);
        });
      },
      (e: any) => {
        const error = `getAllDataFromCollectionWithWhereArrayOnSnapshot - ${collection} - ${arrayWhere.toString()} - ${e}`;
        loggerHelper.report(error);
      },
    );
    return snap;
  }

  async getAllDataFromCollectionWithWhereArray(collection: string, arrayWhere: Array<any>) {
    const returnArray: Array<any> = [];
    let docRef = this.db.collection(collection);
    for (const prop in arrayWhere) {
      docRef = docRef.where(prop, "==", arrayWhere[prop]);
    }

    await docRef
      .get()
      .then(function (snapshot: any) {
        snapshot.forEach(function (doc: any) {
          if (doc && doc.exists && doc.data && doc.id) {
            const result = doc.data();
            result["id"] = doc.id;
            returnArray.push(result);
          }
        });
      })
      .catch((e: any) => {
        const error = "getAllDataFromCollectionWithWhereArray - " + collection + " - " + e;
        loggerHelper.report(error);
      });

    return returnArray;
  }

  /* Usage example : 
  const constraints: any = {
    where: [
      {
        field: "deep_link_ids",
        compare: "array-contains",
        value: examId,
      },
      {
        field: "type",
        compare: "==",
        value: "checkup_exam"
      }
    ],
  };*/
  async getAllDataFromCollectionWithAll(collection: string, constraints: any) {
    let returnArray = new Array();
    let query = this.db.collection(collection);
    const { where, orderBy, limit } = constraints || {};
    if (where) {
      where.forEach(async (cond: any) => {
        if (cond.compare != "in") {
          query = query.where(cond.field, cond.compare, cond.value);
        }
      });
    }
    if (orderBy) {
      orderBy.forEach((cond: any) => {
        query = query.orderBy(cond.field, cond.direction || "asc");
      });
    }
    if (limit) {
      query = query.limit(limit);
    }
    let hasOneIn = false;
    if (where) {
      for (const cond of where) {
        if (cond.compare == "in") {
          hasOneIn = true;
          const equalToChunked = _.chunk(cond.value, 10);

          for (let i = 0; i < equalToChunked.length; i++) {
            const snapshot = await query
              .where(cond.field, "in", equalToChunked[i])
              .get()
              .catch((e: any) => {
                const error = "getAllDataFromCollectionWithAll - " + collection + " - " + cond.compare + " - " + e;
                loggerHelper.report(error);
              });

            snapshot.forEach(function (doc: any) {
              if (doc && doc.exists && doc.data && doc.id) {
                const result = doc.data();
                result["id"] = doc.id;
                returnArray.push(result);
              }
            });
          }
        }
      }
    }
    if (!hasOneIn) {
      await query.get().then((snapshot: any) => {
        returnArray = snapshot.docs.map((doc: any) => ({
          ...(doc || {}).data(),
          id: doc.id,
        }));
      });
    }
    return returnArray;
  }

  async getAllDataFromCollectionWithAllOnSnapshot(collection: string, constraints: any, callBack: any) {
    let query = this.db.collection(collection);
    const { where, orderBy, limit } = constraints || {};
    if (where) {
      where.forEach((cond: any) => {
        query = query.where(cond.field, cond.compare, cond.value);
      });
    }
    if (orderBy) {
      orderBy.forEach((cond: any) => {
        query = query.orderBy(cond.field, cond.direction || "asc");
      });
    }
    if (limit) {
      query = query.limit(limit);
    }
    const resultArray = new Array();
    const snap = query.onSnapshot(
      (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          const result = {
            ...{ id: change.doc.id },
            ...{ change_type: change.type },
            ...change.doc.data(),
          };
          resultArray.push(result);
        });
        callBack(resultArray);
      },
      (e: any) => {
        const error = `getAllDataFromCollectionWithAllOnSnapshot - ${collection} - ${constraints.toString()} - ${e}`;
        loggerHelper.report(error);
      },
    );
    return snap;
  }

  async getDocFromCollectionOnDate(collection: string, arrayWhere: Array<any>, dateFilters: Array<Date>) {
    let docRef = this.db.collection(collection);
    for (const prop in arrayWhere) {
      docRef = docRef.where(prop, "==", arrayWhere[prop]);
    }
    const start = new Date(dateFilters[0]);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    const end = new Date(dateFilters[1]);
    end.setDate(end.getDate() + 1);
    end.setHours(0);
    end.setMinutes(0);

    docRef = docRef.orderBy("time_start").startAt(start).endBefore(end);

    const returnArray: Array<any> = [];
    await docRef
      .get()
      .then(function (snapshot: any) {
        snapshot.forEach(function (doc: any) {
          if (doc && doc.exists && doc.data && doc.id) {
            const result = doc.data();
            result["id"] = doc.id;
            returnArray.push(result);
          }
        });
      })
      .catch((e: any) => {
        const error = "getDocFromCollectionOnDate - " + collection + " - " + e;
        loggerHelper.report(error);
      });
    return returnArray;
  }

  async getAllDataFromCollectionWithAllAndIn(collection: string, whatIs: string, equalTo: Array<any>, constraints: any) {
    const returnArray = new Array();
    const equalToChunked = _.chunk(equalTo, 10);
    let docRef = this.db.collection(collection);

    const { where, orderBy, limit } = constraints || {};
    if (where) {
      where.forEach((cond: any) => {
        docRef = docRef.where(cond.field, cond.compare, cond.value);
      });
    }
    if (orderBy) {
      orderBy.forEach((cond: any) => {
        docRef = docRef.orderBy(cond.field, cond.direction || "asc");
      });
    }
    if (limit) {
      docRef = docRef.limit(limit);
    }

    for (let i = 0; i < equalToChunked.length; i++) {
      await docRef
        .where(whatIs, "in", equalToChunked[i])
        .get()
        .then(function (snapshot: any) {
          snapshot.forEach(function (doc: any) {
            if (doc && doc.exists && doc.data && doc.id) {
              const result = doc.data();
              result["id"] = doc.id;
              returnArray.push(result);
            }
          });
        })
        .catch((e: any) => {
          const error = "getAllDataFromCollectionWithAllAndIn - " + collection + " - " + whatIs + " - " + e;
          loggerHelper.report(error);
        });
    }
    return returnArray;
  }
}
