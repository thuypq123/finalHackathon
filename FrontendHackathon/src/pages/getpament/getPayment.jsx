import React from "react";
import "./getPayment.css";
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

function GetPayment({inSystem, type}) {
    if(!Cookies.get('token')) {
        window.location.href = "/login";
    }
    const milliseconds = new Date();
    const [sdId, setSdId] = useState("");
    const [payMents, setPayMents] = useState([]);
    const [error, setError] = useState("");
    const url = "http://localhost:3000/Get_payment";

    const config = {
        "headers": {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            data: {
                sdId: sdId,
                token: Cookies.get("token"),
                inSystem: inSystem,
            },
            request: {
                requestId: uuidv4(),
                requestTime: milliseconds.getTime(),
            }
        }
        await axios.post(url, JSON.stringify(values), config)
            .then(res => {
                if (res.data.response.responseCode === "00") {
                    if (res.data.data.listPayment === undefined || res.data.data.listPayment.length === 0) {
                        setPayMents(res.data.data.listPayment);
                        swal({
                            title: "Thông báo",
                            text: "Không có dư liệu",
                            icon: "warning",
                            button: "OK",
                        })
                    }else{
                        setPayMents(res.data.data.listPayment);
                    }
                }
            })
            .catch(error => {
                setError("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                console.log(error);
            })
    }
    return (
        <div style={{margin:120}} className='transferHisPage'>
            <div className='transferHisContainer'>
                <div className='transferHisWrapper'>
                    <h2>{type}</h2>
                    <span className='textErrorMsg'>{error}</span>
                    <form onSubmit={handleSubmit} className="transferForm">
                        <div className='transferStyleInput'>
                            <label>Mã số sinh viên</label>
                            <input type="text" name="acctid" id="acctid" required
                                onChange={(e) => setSdId(e.target.value)} />
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
                        <TableCell align="right">SDID</TableCell>
                        <TableCell align="right">description</TableCell>
                        <TableCell align="right">Số Tiền</TableCell>
                        <TableCell align="right">Thời Gian</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {payMents != undefined && payMents.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.accNo}
                        </TableCell>
                        <TableCell align="right">{row.sdId}</TableCell>
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
export default GetPayment;