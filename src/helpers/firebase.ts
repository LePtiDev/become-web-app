// FROM SHARED. DO NOT COPY

import * as _ from "lodash";
import { db } from "../plugins/firebase";

// Create Data
export async function addDataToCollection(collection: string, data: any) {
  return await db
    .collection(collection)
    .add(data)
    .catch((e: any) => {
      const error = "addDataToCollection - " + collection + " - " + e;
      console.log(error);
    });
}

// Update Data
export async function updateDataToCollection(collection: string, id: string, data: any) {
  return await db
    .collection(collection)
    .doc(id)
    .update(data)
    .catch((e: any) => {
      const error = "updateDataToCollection - " + collection + " - " + id + " - " + e;
      console.log(error);
    });
}

export async function deleteData(collection: string, id: string) {
  return await db
    .collection(collection)
    .doc(id)
    .delete()
    .catch((e: any) => {
      const error = "deleteData - " + collection + " - " + id + " - " + e;
      console.log(error);
    });
}

export async function getDocFromCollectionWithWhere(collection: string, arrayWhere: Array<any>) {
  let docRef: any = db.collection(collection);
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
      console.log(error);
    });
  return result;
}

export async function getAllDataFromCollectionWithAll(collection: string, constraints: any) {
  let returnArray = new Array();
  let query: any = db.collection(collection);
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
              console.log(error);
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
/*
export default class DBHelper {
  db: any;
  constructor(db: any) {
    this.db = db;
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
        });
      return result;
    }
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
*/
