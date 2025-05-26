"use client"
import React, {useEffect, useState} from 'react'
import {AgCharts} from "ag-charts-react";
import {useParams} from "next/navigation";

const Pie = () => {
    const params = useParams();
    const id = params?.id as string | "";
    const [options, setOptions] = useState({
        data: [],
        title: {
            text: 'Job Application Tracker',
            color:'white',
            fontSize:'18',
        },
        series: [
            {
                type: 'donut',
                calloutLabelKey: 'asset',
                angleKey: 'amount',
                calloutLabel:{
                    color:'white',
                },
            },
        ],
        legend: {
          item:{
              label:{
                  color:'white',
              },
          },
        },
        background: {
            fill: 'transparent',
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/card-count?id=${id}`); // Replace with actual board ID
            const rows = await res.json();

            // Map DB format to chart format
            const chartData = rows.map((row: { list_name: string; count: number }) => ({
                asset: row.list_name,
                amount: Number(row.count),
            }));

            setOptions((prev) => ({
                ...prev,
                data: chartData,
            }));
        };

        fetchData();
    }, []);

    return <AgCharts options={options} />;
};

export default Pie;
