// Tracker class
class Tracker {
    constructor() {
      this.hostTypes = {};
    }
  
    //   allocate method to allocate the space or number to the hostType and return it
    allocate(hostType) {
      let availableHostNumber = this.nextHostNumber(this.hostTypes[hostType]);
      if (this.hostTypes[hostType]) {
        this.hostTypes[hostType].push(availableHostNumber);
      } else {
        this.hostTypes[hostType] = [availableHostNumber];
      }
  
      return hostType + availableHostNumber;
    }
  
    //   deallocate a space or number from the already added hostTypesu
    deallocate(hostname) {
      let alphabetRegex = /^[a-zA-Z]+$/;
      let lastLetterIndex = 0;
      hostname.split("").forEach((char, index) => {
        if (alphabetRegex.test(char)) {
          lastLetterIndex = index;
        }
      });
      let hostType = hostname.slice(0, lastLetterIndex + 1);
      let hostNum = hostname.slice(lastLetterIndex + 1);
      if (this.hostTypes[hostType]) {
        this.hostTypes[hostType] = this.hostTypes[hostType].filter(
          (num) => num != parseInt(hostNum)
        );
      }
    }
  
    //   check which number is available for a specific hostType
    nextHostNumber(currentNumbers) {
      if (!currentNumbers) return 1;
      else {
        let highestNumber = Math.max.apply(Math, currentNumbers);
        for (let num = 1; num < highestNumber; num++) {
          if (!currentNumbers.includes(num)) return num;
        }
        return highestNumber + 1;
      }
    }
  }
  
  function solution(queries) {
    let tracker = new Tracker();
    let results = [];
    queries.forEach((query) => {
      let [action, name] = query.split(" ");
      if (action === "A") {
        results.push(tracker.allocate(name));
      } else if (action === "D") {
        tracker.deallocate(name);
      }
    });
    return results;
  }
  
  let results = solution([
    "A apiBox",
    "A apiBox",
    "D apiBox1",
    "A apiBox",
    "A apiBox",
    "A siteBox",
    "A siteBox",
    "A siteBox",
    "A siteBox",
    "D siteBox2",
  ]);
  console.log(results);
  