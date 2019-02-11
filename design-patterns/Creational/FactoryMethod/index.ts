interface Interviewer {
  askQuestions();
}

class Developer implements Interviewer {
  askQuestions() {
    console.log('Asking about design patterns!');
  }
}

class CommunityExecutive implements Interviewer {
  askQuestions() {
    console.log('Asking about community building!');
  }
}

abstract class HiringManager {
  interviewer;

  // Factory method
  protected abstract makeInterviewer(): Interviewer;

  takeInterview() {
    this.interviewer = this.makeInterviewer();
    this.interviewer.askQuestions();
  }
}

class DevelopmentManager extends HiringManager {
  protected makeInterviewer(): Interviewer {
    return new Developer();
  }
}

class MarketingManager extends HiringManager {
  protected makeInterviewer(): Interviewer {
    return new CommunityExecutive();
  }
}

let devManager = new DevelopmentManager();
devManager.takeInterview(); // Asking about design patterns!

let marketingManager = new MarketingManager();
marketingManager.takeInterview(); // Asking about community building!
