var About = /** @class */ (function () {
    function About(theme) {
        this.theme = theme;
    }
    About.prototype.getContent = function () {
        return "About page in " + this.theme.getColor();
    };
    return About;
}());
var Careers = /** @class */ (function () {
    function Careers(theme) {
        this.theme = theme;
    }
    Careers.prototype.getContent = function () {
        return "Careers page in " + this.theme.getColor();
    };
    return Careers;
}());
var DarkTheme = /** @class */ (function () {
    function DarkTheme() {
    }
    DarkTheme.prototype.getColor = function () {
        return 'Dark Black';
    };
    return DarkTheme;
}());
var LightTheme = /** @class */ (function () {
    function LightTheme() {
    }
    LightTheme.prototype.getColor = function () {
        return 'Off white';
    };
    return LightTheme;
}());
var AquaTheme = /** @class */ (function () {
    function AquaTheme() {
    }
    AquaTheme.prototype.getColor = function () {
        return 'Lightblue';
    };
    return AquaTheme;
}());
var darkTheme = new DarkTheme();
var about = new About(darkTheme);
var careers = new Careers(darkTheme);
console.log(about.getContent());
console.log(careers.getContent());
