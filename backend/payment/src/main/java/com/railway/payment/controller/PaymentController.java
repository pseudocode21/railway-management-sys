package com.railway.payment.controller;

import com.netflix.discovery.converters.Auto;
import com.railway.payment.dto.PaymentRequestDTO;
import com.railway.payment.dto.PaymentResponseDTO;
import com.railway.payment.exception.PaymentNotFoundException;
import com.railway.payment.service.PaymentService;
import com.railway.payment.client.ReservationClient;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    private final ReservationClient reservationClient;


    public PaymentController(PaymentService paymentService, ReservationClient reservationClient) {
        this.paymentService = paymentService;
        this.reservationClient = reservationClient;
    }

    @PostMapping("/verify")
    public PaymentResponseDTO processPayment(@RequestBody PaymentRequestDTO request) {
        return paymentService.processPayment(request);
    }

    @GetMapping("/status/{resId}")
    public ResponseEntity<?> getPaymentStatus(@PathVariable String resId) {
        try {
            return ResponseEntity.ok(paymentService.getPaymentStatusDetails(resId));
        } catch (PaymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/confirm/{resId}")
    public ResponseEntity<Void> confirmPayment(
            @PathVariable String resId,
            @RequestParam String pnr) {
        System.out.println("Received confirmPayment for resId: " + resId + " with PNR: " + pnr);
        try {
            reservationClient.confirmPayment(resId, pnr);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
}