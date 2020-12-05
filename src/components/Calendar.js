import React from 'react';
import '../calendar.css';
// import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
// import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import '../../public/img/calender.svg';

class Calendar extends React.Component {
    weekdays = moment.weekdays();
  
    state = {
        dateObject: moment(),
        allmonths: moment.months(),
        selectedDay: null
    };
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };
    getCurrentMonth = () => {
        return this.state.dateObject.format("MMMM");
    };
    getCurrentYear = () => {
        return this.state.dateObject.format("Y");
    }
    currentDay = () => {
        return this.state.dateObject.format("D");
    };
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d"); // Day of week 0...1..5...6
        return firstDay;
    };
    onPrev = () => {
        let curr = "month";
        this.setState({
            dateObject: this.state.dateObject.subtract(1, curr)
        });
    };
    onNext = () => {
        let curr = "month";
        this.setState({
            dateObject: this.state.dateObject.add(1, curr)
        });
    };
    onDayClick = (e, d) => {
        this.setState(
            {
            selectedDay: d
            },
            () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
            }
        );
    };
    setCurrentMonth = () => {
        this.setState({
            dateObject: moment()
        });
    }
      
    render() {
        let weekDaysNames = this.weekdays.map((day, index) => {
          return <th key={index}>{day}</th>;
        });
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<TableCell key={Math.random()} align="center">{""}</TableCell>);
        }
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let viewedMonth = this.getCurrentMonth();
            let viewedYear = this.getCurrentYear();
            let viewedMoment = moment().set('year', viewedYear).set('month', viewedMonth).set('date', d);
            let presentMoment = moment();

            // Check it it is current day or not
            let currentDay = presentMoment.isSame(viewedMoment);
            // console.log("Current Day ", presentMoment, viewedMoment, presentMoment.isSame(viewedMoment));
            // Get the Day Of Week to render Weekly Off. 
            // Render for value 6 & 0 only i.e Sat & Sund
            let dayOfWeek =  viewedMoment.day();
            // Set Style for Current Date 
            let selectedStyle = currentDay ? { fontSize: '40px', color: '#0f6ebe' } : {}; 
            daysInMonth.push(
                <TableCell
                    align="center"
                    key={d}
                    style={currentDay ? { opacity: 1, borderWidth: '2px', borderColor: '#0f6ebe' } : {}}
                    onClick={e => {
                        this.onDayClick(e, d);
                    }}
                >
                <span
                    style={selectedStyle}
                >
                    {d}
                    {(dayOfWeek === 0 || dayOfWeek === 6 ) && <span className="weekly-off">Weekly off</span>}
                </span>
                </TableCell>
            );
        }
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];
      
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });
        let daysinmonth = rows.map((d, i) => {
            return <TableRow key={i} align="center" >{d}</TableRow>;
        });
        return (
            <TableContainer>
              <div className="header-section">
                <ul>
                  <li>
                      <button 
                        type="button"
                        className="blue-btn"
                        onClick={e => this.setCurrentMonth()}
                      >
                        <img src="../img/calender.svg" alt="calender-icon" />
                        Today
                      </button>
                 </li>
                  <li className="month-btn-style">
                      <button type="button" className="month-btn">
                          <ChevronLeftOutlinedIcon 
                            onClick={e => {
                                this.onPrev();
                            }}
                          />
                          <span className="month-text">
                              {`${this.getCurrentMonth()}-${this.getCurrentYear()}`}
                          </span>
                          <ChevronRightOutlinedIcon
                            onClick={e => {
                                this.onNext();
                            }}
                          />
                     </button>
                    </li>
                </ul>
              </div>
              {/* <Typography variant="h6" id="tableTitle" className="dark-color">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<EventAvailableIcon />}
              >
                Delete
              </Button>
                <Input type="search" className="custom-search">
                  </Input>
                  </Typography> */}
              <Table className="custom-table" aria-label="simple table">
                <TableHead>
                  <TableRow className="rowColor">
                    {weekDaysNames.map((item, index) => {
                        return (<TableCell key={index} align="center">{item}</TableCell>);
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                    {daysinmonth}
                </TableBody>
              </Table>
            </TableContainer>
          );
    }  
}

export default Calendar;
