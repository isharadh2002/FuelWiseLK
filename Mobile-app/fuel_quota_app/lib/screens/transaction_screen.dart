import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../app_config.dart';

class TransactionPage extends StatefulWidget {
  final String stationId;

  const TransactionPage({super.key, required this.stationId});

  @override
  State<TransactionPage> createState() => _TransactionPageState();
}

class _TransactionPageState extends State<TransactionPage> {
  late Future<List<Map<String, dynamic>>> transactionFuture;

  @override
  void initState() {
    super.initState();
    transactionFuture = fetchTransactions(widget.stationId);
  }

  Future<List<Map<String, dynamic>>> fetchTransactions(String stationId) async {
    try {
      final response = await http.get(
        Uri.parse('$backendURL/api/v1/FuelTransaction/getTransactions/$stationId'),
      );

      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        return List<Map<String, dynamic>>.from(data);
      } else {
        throw Exception('Failed to load transactions');
      }
    } catch (e) {
      throw Exception('Error fetching transactions: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transactions'),
        backgroundColor: const Color(0xFF22C55F),
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: transactionFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final transactions = snapshot.data!;
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: transactions.isEmpty
                  ? const Center(child: Text('No transactions available.'))
                  : ListView.builder(
                itemCount: transactions.length,
                itemBuilder: (context, index) {
                  final transaction = transactions[index];
                  return _buildTransactionCard(
                    transaction['pumpedLitres'],
                    transaction['fuelType'],
                    transaction['vehicleID'].toString(),
                    transaction['transactionTime'],
                  );
                },
              ),
            );
          } else {
            return const Center(child: Text('No transaction data available.'));
          }
        },
      ),
    );
  }

  Widget _buildTransactionCard(String pumpedLitres, String fuelType, String vehicleID, String transactionTime) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildTransactionField('Pumped Litres', '$pumpedLitres L'),
            _buildTransactionField('Fuel Type', fuelType),
            _buildTransactionField('Vehicle ID', vehicleID),
            _buildTransactionField('Transaction Time', transactionTime),
          ],
        ),
      ),
    );
  }

  Widget _buildTransactionField(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black54),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500, color: Colors.black),
          ),
        ],
      ),
    );
  }
}
