import React from "react";
import "./transferHistory.css";
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from "js-cookie";
import swal from "sweetalert";
import userImage from "../../Images/user.png"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TransferHistory() {
    if(!Cookies.get('token')) {
        window.location.href = "/login";
    }
    const milliseconds = new Date();
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [error, setError] = useState("");
    const [errorAcct, setErrorAcct] = useState("");
    const [tranHis, setTranHis] = useState();

    const url = "http://localhost:3000/tranhis";

    const config = {
        "headers": {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFromDate = moment(fromDate).format("DD-MM-YYYY");
        const newToDate = moment(toDate).format("DD-MM-YYYY");
        console.log(newFromDate, newToDate);
        const values = {
            data: {
                fromDate: newFromDate,
                toDate: newToDate,
                inSystem: true,
                token: Cookies.get("token"),
            },
            request: {
                requestId: uuidv4(),
                requestTime: milliseconds.getTime(),
            }
        }
        await axios.post(url, JSON.stringify(values), config)
            .then(res => {
                if (res.data.responseCode === "00") {
                    if(res.data.data.transHis.length === 0){
                        swal("Thông báo", "Không có giao dịch nào trong khoảng thời gian bạn chọn!", "warning");
                    }
                    setTranHis(res.data.data.transHis);
                } else {
                    setError("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                }
            })
            .catch(error => {
                setError("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                console.log(error);
            })
    }
    return (
        <div className='transferHisPage'>
            <div className='transferHisContainer'>
                <div className='transferHisWrapper'>
                    <h2>Liệt kê các giao dịch ngân hàng điện tử</h2>
                    <span className='textErrorMsg'>{error}</span>
                    <form onSubmit={handleSubmit} className="transferForm">
                        <div className='transferStyleInput'>
                            <label>Từ ngày</label>
                            <input type="date" name="fromdate" id="fromdate" required
                                onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        <div className='transferStyleInput'>
                            <label>Lời nhắn</label>
                            <input type="date" name="todate" id="todate" required
                                onChange={(e) => setToDate(e.target.value)} />
                        </div>
                        <div className='transferStyleInput'>
                            <button type="submit" className='btnButton btnTransfer'>Truy vấn</button>
                        </div>
                    </form>
                </div>
                <TableContainer sx={{ height: '48%'}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>STK</TableCell>
                        <TableCell align="right">STK Nhận</TableCell>
                        <TableCell align="right">description</TableCell>
                        <TableCell align="right">Số Tiền</TableCell>
                        <TableCell align="right">Thời Gian</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tranHis != undefined && tranHis.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.accountNo}
                        </TableCell>
                        <TableCell align="right">{row.toAccNo}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default TransferHistory;