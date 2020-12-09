import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, Error, StyledInput } from "./styles";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ColumnWrapper from "../ColumnWrapper";

const TextField = styled(
  ({
    id,
    name,
    value,
    placeholder,
    errorMessage,
    isTouched,
    hintText,
    type,
    onChange,
    disabled,
    className,
    onClick,
    onFocus,
    onBlur,
    disableFuture,
    autoOk
  }) => {
    const error = errorMessage == null ? "" : errorMessage;
    const isError = isTouched && error.length > 0;
    const isDate = type === "date";
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, handleDateChange] = useState("");

    const clickDatePicker = () => {
      setIsOpen(true);
    };
    const setDateChange = (payload) => {
      handleDateChange(payload);
      onChange(dateFormatter(payload));
    };

    const dateFormatter = (dateSelected) => {
      const date = new Date(dateSelected);
      var strArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const d = date.getDate();
      const m = strArray[date.getMonth()];
      const y = date.getFullYear();
      return (d <= 9 ? "0" + d : d) + " " + m + " " + y;
    };
    return (
      <div className={className}>
        {isDate ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnWrapper>
              <div className="date">
                <FontAwesomeIcon className="fa-date" icon={faCalendarDay} />
                <StyledInput
                  id={id}
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  disabled={disabled}
                  error={error}
                  onClick={clickDatePicker}
                  onChange={setDateChange}
                  readOnly
                />
              </div>
              {hintText && <Text>{hintText}</Text>}
              {isError && <Error>{error}</Error>}
              <DatePicker
                className="date-picker"
                variant="inline"
                open={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                value={selectedDate}
                onChange={setDateChange}
                disableFuture={disableFuture}
                autoOk={autoOk}
              />
            </ColumnWrapper>
          </MuiPickersUtilsProvider>
        ) : (
          <div>
            <StyledInput
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              error={error}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {hintText && <Text>{hintText}</Text>}
            {isError && <Error>{error}</Error>}
          </div>
        )}
      </div>
    );
  }
)``;

TextField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  hintText: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextField;
